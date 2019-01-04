module.exports = function (controller) {


  controller.hears(['Hai', 'hi'], 'message_received', function (bot, message) {

    bot.reply(message, 'Hello user');
    bot.reply(message, 'Thank you for contacting syncfusion chatbot, how can I help you ?');

  });
  
  controller.hears(['components', 'developed', 'controls'], 'message_received', function (bot, message) {

    bot.reply(message, 'We have developed 50+ components in syncfusion.\n\nPlease refer this [link](https://ej2.syncfusion.com/home/)');
  });
  controller.hears(['information', 'useful'], 'message_received', function (bot, message) {

    bot.reply(message, 'Thanks for contacting us. For more queries regarding our products contact syncfusion support.');

  });
  controller.hears(['Thanks', 'suggestion'], 'message_received', function (bot, message) {

    bot.reply(message, 'You’re welcome');

  });
  controller.hears('Bye', 'message_received', function (bot, message) {

    bot.reply(message, 'Bye for now');

  });
  controller.hears('Thank you', 'message_received', function (bot, message) {

    bot.reply(message, 'Welcome');

  });
  controller.hears(['response', 'quick'], 'message_received', function (bot, message) {

    bot.reply(message, 'We are always there to help you…!! 😊');

  });
  controller.hears('bot', 'message_received', function (bot, message) {

    bot.reply(message, 'Yes I’m, Do you need any help ?');

  });
  controller.hears('bot', 'message_received', function (bot, message) {

    bot.reply(message, 'Yes I’m, Do you need any help ?');

  });
  controller.hears('Phone', 'message_received', function (bot, message) {

    bot.reply(message, 'please contact us in');
    bot.reply(message, 'Phone:- +91 44 26210413\n\nE-mail:- info@syncfusion.com');

  });
  controller.hears('about', 'message_received', function (bot, message) {

    bot.reply(message, 'Our mission is to help our customers deliver awesome enterprise software quickly.');
    bot.reply(message, 'Founded in 2001 and headquartered in Research Triangle Park, N.C., Syncfusion has more than 13,000 customers and more than 1 million users, including large financial institutions, Fortune 500 companies, and global IT consultancies. Today we provide 1,000+ controls and frameworks for web, mobile, and desktop development. We provide ready-to-deploy enterprise software for dashboards, reports, data integration, and big data processing. Many customers have saved millions in licensing fees by deploying our software.');

  });
  controller.hears('platforms', 'message_received', function (bot, message) {

    bot.reply(message, 'Pure js\njQery\nDesktop\nFile Formats\nData platform\nData science');
    bot.reply(message, 'Founded in 2001 and headquartered in Research Triangle Park, N.C., Syncfusion has more than 13,000 customers and more than 1 million users, including large financial institutions, Fortune 500 companies, and global IT consultancies. Today we provide 1,000+ controls and frameworks for web, mobile, and desktop development. We provide ready-to-deploy enterprise software for dashboards, reports, data integration, and big data processing. Many customers have saved millions in licensing fees by deploying our software.');

  });

  function replyMsg(res, iterationCount) {
    let index, text = 'Below are the search results\n\n';
    for (let i = 0; i < iterationCount; i++) {
      if (Math.max(...res.occurence)) {
        index = res.occurence.indexOf(Math.max(...res.occurence));

        text = text + global.data[res.keys[index]] + '\n\n';
        res.occurence[index] = 0;
      }
    }
      return text;
  }

  controller.on('message_received', function (bot, message) {
    let resultantOutput = global.filter(message.text, global.data);
    let sortedValue = resultantOutput.occurence.slice().sort(function (a, b) { return b - a }).filter(function (num) { return num; });
    let msg = replyMsg(resultantOutput, 2);
    let resutantText;
    if (sortedValue.length === 0) {
      bot.reply(message, 'I do not know how to respond to that message yet.');
    } else if (sortedValue.length < 3) {
      msg = msg + "For more queries contact our [support](https://www.syncfusion.com/support/directtrac/incidents/newincident) team."
      bot.reply(message, msg);
    } else {
      bot.startConversation(message, function (err, convo) {
        convo.ask({
          text: msg,
          quick_replies: [
            {
              title: 'More results (' + (sortedValue.length - 2) + ')',
              payload: 'result',
            }]
        }, [
            {
              pattern: 'result',
              callback: function (res, convo) {
                resutantText = replyMsg(resultantOutput, (sortedValue.length - 2)) + "For more queries contact our [support](https://www.syncfusion.com/support/directtrac/incidents/newincident) team."
                ;

                convo.addMessage({
                  text: resutantText,
                });
                convo.next();
              }
            },
            {
              default: true,
              callback: function (res, convo) {
                convo.gotoThread('end');
              }
            }
          ]);
        convo.addMessage({
          text: 'I do not know how to help with that. Say `help` at any time to access this menu.'
        }, 'end');
      });
    }
  });

  controller.hears('typing', 'message_received', function (bot, message) {

    bot.reply(message, {
      text: 'This message used the automatic typing delay',
      typing: true,
    }, function () {

      bot.reply(message, {
        text: 'This message specified a 5000ms typing delay',
        typingDelay: 5000,
      });

    });

  });

}
