/* This module kicks in if no Botkit Studio token has been provided */

module.exports = function(controller) {
  var expression = function (tests, message) {
    let occurence = false;
    message.text.split(' ').forEach(function (splitValue) {
    splitValue = splitValue.toLowerCase();
    if (tests.indexOf(splitValue) !== -1) {
    occurence = true;
    };
    });
    return occurence;
    };
     
    controller.changeEars(expression);

    controller.on('hello', conductOnboarding);
    controller.on('welcome_back', conductOnboarding);

    function conductOnboarding(bot, message) {

      bot.startConversation(message, function(err, convo) {

        convo.say({
          text: 'Hello !\n\n Welcome to Syncfusion support',
          quick_replies: [
            {
              title: 'Help',
              payload: 'help',
            },
          ]
        });


      });

    }

    controller.hears(['help','contact','documentation','docs','samples'], 'message_received', function(bot, message) {

      bot.startConversation(message, function(err, convo) {

        // set up a menu thread which other threads can point at.
        convo.ask({
          text: 'I can point you to resources, and connect you with experts who can help.',
          quick_replies: [
            {
              title: 'Syncfusion Documentation',
              payload: 'documentation',
            },
            {
              title: 'Syncfusion samples',
              payload: 'samples',
            },
            {
              title: 'Contact us',
              payload: 'contact us',
            },
          ]
        },[
          {
            pattern: 'documentation',
            callback: function(res, convo) {
              convo.gotoThread('docs');
              convo.next();
            }
          },
          {
            pattern: 'samples',
            callback: function(res, convo) {
              convo.gotoThread('samples');
              convo.next();
            }
          },
          {
            pattern: 'contact',
            callback: function(res, convo) {
              convo.gotoThread('contact');
              convo.next();
            }
          },
          {
            default: true,
            callback: function(res, convo) {
              convo.gotoThread('end');
            }
          }
        ]);

        // set up docs threads
        convo.addMessage({
          text: 'I do not know how to help with that.'
        },'end');
                
        // set up docs threads
        convo.addMessage({
          text: 'You can refer this link for further assitance\n\n[Syncfusion documentation](https://help.syncfusion.com/)',
        },'docs');


        // set up samples thread

        convo.addMessage({
          text: 'You can refer this link for further assitance\n\n[Syncfusion samples](https://ej2.syncfusion.com/home/)',
        },'samples');


        // set up contact thread
        convo.addMessage({
          text: '[Syncfusion contact](https://www.syncfusion.com/company/contact-us)',
        },'contact');

      });

    });


}
