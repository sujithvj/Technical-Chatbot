var env = require('node-env-file');
env(__dirname + '/.env');


var Botkit = require('botkit');
var debug = require('debug')('botkit:main');

var bot_options = {
    replyWithTyping: true,
};

// Use a mongo database if specified, otherwise store in a JSON file local to the app.
// Mongo is automatically configured when deploying to Heroku
if (process.env.MONGO_URI) {
    // create a custom db access method
    var db = require(__dirname + '/components/database.js')({});
    bot_options.storage = db;
} else {
    bot_options.json_file_store = __dirname + '/.data/db/'; // store user data in a simple JSON format
}

// Create the Botkit controller, which controls all instances of the bot.
var controller = Botkit.socketbot(bot_options);

// Set up an Express-powered webserver to expose oauth and webhook endpoints
var webserver = require(__dirname + '/components/express_webserver.js')(controller);

// Load in some helpers that make running Botkit on Glitch.com better
require(__dirname + '/components/plugin_glitch.js')(controller);

// Load in a plugin that defines the bot's identity
require(__dirname + '/components/plugin_identity.js')(controller);

// Open the web socket server
controller.openSocketServer(controller.httpserver);

// Start the bot brain in motion!!
controller.startTicking();

var normalizedPath = require("path").join(__dirname, "skills");
require("fs").readdirSync(normalizedPath).forEach(function (file) {
    require("./skills/" + file)(controller);
});

console.log('Syncfusion chatbot is listenning at http://localhost:' + (process.env.PORT || 3000))

function usage_tip() {
}
global.data = {

    "custom value | custom | allowcustom | multiselect": "[custom value in multiselect](https://ej2.syncfusion.com/documentation/multi-select/custom-value/)",

    "data binding | datamanager | multiselect ": "[Databinding in multiselect](https://www.syncfusion.com/forums/140245/trying-to-populate-the-multiselect-with-custom-backendadapter/)",

    "store and retrieve data with database | database | store in DB|multiselect": "[store multiselect value in db](https://www.syncfusion.com/forums/139959/multi-select-dropdown-to-database)",

    "preselect values | value | select | predefined | multiselect":

        "[preselect values in multiselect](https://www.syncfusion.com/forums/137474/set-default-values)",

    "validate multiSelect | validation | multiselect": "[Validation in MultiSelect](https://ej2.syncfusion.com/documentation/multi-select/how-to/validation/)",

    "show items with icons | icons | icon list| multiselect": "[show icons in MultiSelect](https://ej2.syncfusion.com/documentation/multi-select/how-to/icons-support/)",

    "refresh": "[Refresh multiSelect](https://ej2.syncfusion.com/documentation/api/multi-select/#refresh)",

    "chip customization | chip | custom chip | chips| multiselect": "[customize chip in multiselect](https://ej2.syncfusion.com/demos/#/material/multi-select/chip-customization.html)",

    "diacritics filtering | diacritics | ignoreAccent|multiselect": "[Diacritics Filtering](https://ej2.syncfusion.com/demos/#/material/multi-select/diacritics-filtering.html)",

    "filtering | filter | allowFiltering | filter type | multiselect": "[Filtering](https://ej2.syncfusion.com/demos/#/material/multi-select/filtering.html)",

    "comparison between dropdown components | compare | difference between multiSelect and dropDownList": "[Compare dropdown components](https://www.syncfusion.com/kb/8331/compare-dropdownlist-vs-combobox-vs-autocomplete-vs-multiselect)",
    "render inside modal | multiSelect inside Dialog": "[Render multiselect inside modal](https://www.syncfusion.com/forums/135781/ej-multiselect-and-ej-dropdown-implementation-in-bootstrap-modal)",

    "getting started with angular multiSelect | angular multiSelect": "[Angular multiselect](https://www.syncfusion.com/kb/9882/how-to-get-started-easily-with-syncfusion-angular-7-multiselect)",

    "select all in multiSelect | select all": "[select all in multiselect](https://ej2.syncfusion.com/demos/#/material/multi-select/checkbox.html\nhttps://ej2.syncfusion.com/documentation/multi-select/checkbox/#select-all/)",

    "selection limit | limit | Count | restrict selection| multiselect": "[selection limit in multiselect](https://ej2.syncfusion.com/demos/#/material/multi-select/selection-limit.html/)",

    "templates | Item template | value template | footer template | header template | action failure template | no records template | multiselect": "[Template in multiselect](https://ej2.syncfusion.com/demos/#/material/multi-select/template.html/)",

    "localization | locale | multiselect ": "[Localization in multiselect](https://ej2.syncfusion.com/documentation/multi-select/localization/)",

    "grouping | group | categorize| multiselect": "[Grouping in multiseelct](https://ej2.syncfusion.com/documentation/multi-select/grouping/)",

    "checkboxes | check | uncheck in multiselect": "[Checkboxes in multiselect](https://ej2.syncfusion.com/documentation/multi-select/checkbox/)",

    "keyboard interaction | keyboard in multiselect": "[Keyboard interaction in multiselect](https://ej2.syncfusion.com/documentation/multi-select/accessibility/#keyboard-interaction)",

    "elements that can be rendered as multiSelect | supported elements": "[Elements supported as multiselect](https://ej2.syncfusion.com/documentation/multi-select/tags/?no-cache=1#initialize-tags)",

    "selection order | multiselect": "[Selection order](https://ej2.syncfusion.com/demos/#/material/multi-select/checkbox.html)",

    "floatLabeltype | floatLabel type in multiselect": "[Float label type in multiselect](https://ej2.syncfusion.com/documentation/api/multi-select/#floatlabeltype)",

    "hide selected item | hide item in multiselect": "[Hide selected item in multiselect](https://ej2.syncfusion.com/documentation/api/multi-select/#hideselecteditem)",

    "open on click | open in multiselect": "[Open on click in multiselect](https://ej2.syncfusion.com/documentation/api/multi-select/#openonclick)",

    "popup dimensions | height | width in multiselect": "[Popup dimensions in multiseelct](https://ej2.syncfusion.com/documentation/api/multi-select/#popupwidth)",

    "clear items | remove | delete items in multiselect": "[Clear items in multiselect](https://ej2.syncfusion.com/documentation/api/multi-select/#showclearbutton)",

    "sort order in multiSelect | sort order | items order": "[Sort order in multiseelct](https://ej2.syncfusion.com/documentation/api/multi-select/#sortorder)",

    "display number of items selected in multiSelect | display count": "[Display number of items selected in multiselect](https://www.syncfusion.com/forums/138528/how-to-enable-number-of-count-of-selected-item-from-drop-down-list-and-show-in-dropdown-field-instead)",

    "apply pending property changes immediately | databind | immediate change | multiselect": "[dataBind in multiselect](https://ej2.syncfusion.com/documentation/api/multi-select/#databind)",

    "increase z-index for popup | z-index | popup z-index| multiselect": "[z-index in multiselect](https://ej2.syncfusion.com/documentation/api/multi-select/#zindex)",

    "show or hide popup | show | hide | popup in multiselect": "[show or hide popup in multiselect](https://ej2.syncfusion.com/documentation/api/multi-select/#showpopup)",

    "show or hide spinner | spinner | spinner with multiselect": "[show or hide spinner in multiselect](https://ej2.syncfusion.com/documentation/api/multi-select/#showspinner\nhttps://ej2.syncfusion.com/documentation/api/multi-select/#hidespinner)",

    "culture specification| set Culture | specify locale | DatePicker": "[set culture in datepicker](https://ej2.syncfusion.com/15.4.17/documentation/datepicker/globalization.html)",

    "style | css | cell | customize | DatePicker": "[customize datepicker](https://ej2.syncfusion.com/documentation/datepicker/customization/)",

    "close event | popup prevent | datepicker": "[Prevent popup close in datepicker](https://ej2.syncfusion.com/documentation/datepicker/how-to/prevent-the-popup-close/)",

    "datepicker | instance": "[Get instance of datepicker](https://stackblitz.com/edit/js-b3wfxo)",

    "datepicker | format | yyyy-mm-dd": "[Date-format](https://ej2.syncfusion.com/16.1.37/demos/#/material/datepicker/date-format.html)",

    "highlight | specific-date | datepicker": "[highlight dates](https://ej2.syncfusion.com/demos/#/material/datepicker/special-dates.html)",

    "weekend | weekends | datepicker": "[Disable weekend dates](https://ej2.syncfusion.com/demos/#/material/datepicker/disabled.html)",

    "range | min | max | value | datepicker": "[Date-range](https://ej2.syncfusion.com/demos/#/material/datepicker/date-range.html)",

    "month view | depth start | datepicker": "[Date-Views](https://ej2.syncfusion.com/documentation/datepicker/date-views/)",

    "strict mode | datepicker": "[Strict mode in datepicker](https://ej2.syncfusion.com/documentation/datepicker/strict-mode/)",

    "enable | disable | datepicker ": "[How to disable the datepicker](https://ej2.syncfusion.com/documentation/datepicker/how-to/disabled-the-datepicker-component/)",

    "Tree drag and drop | drag drop in tree": "[Drag and drop in treeview](https://ej2.syncfusion.com/documentation/treeview/drag-and-drop)",

    "Tree nodes image and icons | Icons Images in tree node": "[Icon and images in treeview](https://ej2.syncfusion.com/demos/#/material/treeview/icons.html)",

    "Tree node selection | node selection | selection| multiple selection ": "[multiple selection in treeview](https://ej2.syncfusion.com/documentation/treeview/multiple-selection/)",

    "Custom elements in tree | custom elements in node | Template | node template ": "[template in treeview](https://ej2.syncfusion.com/documentation/treeview/template/)",

    "Check box in tree | check box | checkbox": "[checkbox in treeview](https://ej2.syncfusion.com/documentation/treeview/check-box/)",

    "Editing in tree | allowediting| allow editing | editing nodes ": "[Treeview node editing](https://ej2.syncfusion.com/documentation/treeview/node-editing/)",

    "Data binding in tree| hierarchical data binding | self referential data bidning | remote data binding ": "[Data binding in treeview](https://ej2.syncfusion.com/demos/#/material/treeview/local-data.html)",

    "Customize icons in tree | icon customization": "[Icon customization in treeview](https://ej2.syncfusion.com/documentation/treeview/how-to/customize-the-expand-and-collapse-icons/)",

    "Curd operations in tree | curd operation | Add nodes | add node | update node | remove node | delete node |node manipulation | Update nodes| ": "[Tree node operation in treeview](https://ej2.syncfusion.com/documentation/treeview/how-to/process-the-tree-node-operations-using-context-menu/)",

    "Click the node to update the check box state | node click to update the checkbox state | Check the checkbox on clicking the node text": "[checkbox click in treeview](https://ej2.syncfusion.com/documentation/treeview/how-to/check-uncheck-the-checkbox-on-clicking-the-tree-node-text/)",

    "Validate the tree nodes on editing | validation on node editing | Validate the tree nodes when rename the nodes": "[Node editing in treeview](https://ej2.syncfusion.com/documentation/treeview/how-to/validate-the-text-when-renaming-the-tree-node/)",

    "Tree node customization | customize node| customization | Customize the tree nodes based on level": "[Tree node customization](https://ej2.syncfusion.com/documentation/treeview/how-to/customize-the-tree-nodes-based-on-levels/)",

    "Customize drag and drop functionality in tree| drag and drop customization | Restrict option for particular": "[customize drag and drop in treeview](https://ej2.syncfusion.com/documentation/treeview/how-to/restrict-the-drag-and-drop-for-particular-tree-nodes/)",

    "Remote data binding in tree view with adaptor | remote data with adaptor ": "[Treeview remote data binding](https://www.syncfusion.com/forums/137210/generate-treeview-from-remote-data)",

    "How to get tree data in treeview | get data | get tree data": "[Get tree data in treeview](https://ej2.syncfusion.com/documentation/api/treeview/#gettreedata)",

    "Prevent expand / collapse actions on double click | prevent expand / collapse action": "[expand and collapse action in treeview](https://www.syncfusion.com/forums/136942/double-click-event)",

    "Dynamically load data in tree | load data| dynamically load data ": "[urladaptor for load data in treeview](https://www.syncfusion.com/forums/137542/treeview-load-data-on-external-event-with-urladaptor)",

    "Change color in tree node | node color customization": "[Node color customization in treeview](https://www.syncfusion.com/forums/136099/treeview-color)",

    "Routing in tree view | routing | router": "[Routing in treeview](https://www.syncfusion.com/forums/140792/tree-view-item-router-link)",

    "Get and update the node | get node| update node": "[Node update in treeview](https://www.syncfusion.com/forums/141082/getnode-and-updatenode-methods-don180t-work-unless-treeview-is-expanded)",

    "Change the expand / collapse icon position in tree| change icon position | change expand / collapse icon position": "[Change icon position in treeview](https://www.syncfusion.com/forums/139614/how-to-display-the-treeview-folding-icon-on-the-right-side)",

    "Add nested nodes in tree view | add nodes | add nested nodes": "[Nested nodes in treeview](https://www.syncfusion.com/forums/141182/can-add-nested-nodes-with-addnodes-method)",

    "Customize custom elements in tree node | customize template ": "[ Customize template in treeview](https://www.syncfusion.com/forums/136564/customize-image-padding)",

    "Get node path on tree |  node path | traversing path": "[Node path traversing in treeview](https://www.syncfusion.com/forums/141431/can-get-node-fullpath-with-nodeclick)",

    "Styles not applied in tree view | style issue ": "[Style issue with solution in treeview](https://www.syncfusion.com/forums/134649/angular-treeview-on-display-as-per-example)",

    "Angular 4 treeview | angular4 tree": "[Angular 4 treeview getting started](https://www.syncfusion.com/kb/9850/how-to-get-started-with-syncfusion-angular-4-treeview-component)",

    "Angular 5 treeview | angular5 tree": "[Angular 5 treeview getting started](https://www.syncfusion.com/kb/9859/how-to-get-started-with-syncfusion-angular-5-treeview-component)",

    "Angular 6 treeview | angular6 tree": "[Angular 6 treeview getting started](https://www.syncfusion.com/kb/9853/how-to-get-started-with-syncfusion-angular-6-treeview-component)",

    "angular 7 treeview | angular7 tree": "[Angular 7 treeview getting started](https://www.syncfusion.com/kb/9861/how-to-get-started-with-syncfusion-angular-7-treeview-component)",

    "Customize textbox size on editable state in tree": "[Customize textbox in editable tree](https://www.syncfusion.com/kb/9962/how-to-adjust-the-textbox-size-in-treenode-editable-state)",

    "Specify the scope of drag and drop area tree| scope of drag and drop  ": "[Scope of drag and drop in treeview](https://www.syncfusion.com/kb/9923/how-to-specify-the-scope-of-drag-and-drop-area-in-treeview)",

    "Get child nodes in tree | get children": "[Child nodes in treeview](https://www.syncfusion.com/kb/9915/how-to-get-child-nodes-for-particular-parent-in-treeview)",

    "Filtering in tree| filter": "[Filtering in treeview](https://www.syncfusion.com/kb/9927/how-to-filter-the-tree-nodes-in-treeview)",

    "custom value | custom | allowcustom | multiselect": "[Custom value in multiselect](https://ej2.syncfusion.com/documentation/multi-select/custom-value/)",

    "EJ1 & EJ 2 | both ej1 and ej2": "[Using both ej1 and ej2 control in dialog](https://www.syncfusion.com/forums/136684/how-to-use-ej1-and-ej2-controls-in-the-same-asp-net-core-project-website)",

    "Navigation link in tree | navigation url": "[Navigation link in dialog](https://www.syncfusion.com/kb/9945/how-to-open-the-navigation-link-in-new-window)",

    "Modal Dialog | modal | modal popup | Grid inside modal | tab inside modal ": "[Model dialog in dialog](https://ej2.syncfusion.com/documentation/dialog/getting-started/#modal-dialog/)",

    "Header | Dialog header | Title ": "[Enable header in dialog](https://ej2.syncfusion.com/documentation/dialog/getting-started/#enable-header)",

    "Positioning Dialog | position | modify dialog position | Align Dialog": "[Positioning in dialog](https://ej2.syncfusion.com/documentation/dialog/getting-started/#positioning)",

    "Draggable dialog | Drag dialog | Movable Dialog | Draggable popup": "[Draggable in dialog](https://ej2.syncfusion.com/documentation/dialog/getting-started/#draggable)",

    "Template | Dialog template | Template in popup| Images in Dialog": "[Template in dialog](https://ej2.syncfusion.com/documentation/dialog/template/)",

    "Icons in Dialog | Icons to dialog button": "[Dialog buttons in dialog](https://ej2.syncfusion.com/documentation/dialog/how-to/add-an-icons-to-dialog-buttons/)",

    "Animation | Animated dialog | Animation in popup": "[Animation in dialog](https://ej2.syncfusion.com/demos/#/material/dialog/animation.html)",

    "Localization | Locale | Locale Dialog | Globalization": "[Localization in dialog](https://ej2.syncfusion.com/documentation/dialog/localization/)",

    "Show Dialog in full screen | Full screen Dialog | Display popup in full window": "[Dialog with full screen](https://ej2.syncfusion.com/documentation/dialog/how-to/show-dialog-with-full-screen/)",

    "Load content through AJAX in Dialog | Dialog with AJAX Content | Ajax content for popup": "[Dialog using ajax](https://ej2.syncfusion.com/documentation/dialog/how-to/load-dialog-content-using-ajax/)",

    "Resizable Dialog | Resize dialog | Resize popup": "[Resizable in dialog](https://ej2.syncfusion.com/demos/#/material/dialog/resizable.html)",

    "Custom Dialogs| Customize Dialogs | Custom popup": "[Custom dialog](https://ej2.syncfusion.com/demos/#/material/dialog/custom-dialog.html)",

    "Close Dialog when click outside the dialog | Close Dialog": "[Close the dialog](https://ej2.syncfusion.com/documentation/dialog/how-to/close-dialog-while-click-on-outside-of-dialog/)",

    "Close dialog on Escape | Close dialog on ESC | Close popup on ESC": "[Close one scape in dialog](https://ej2.syncfusion.com/documentation/api/dialog/#closeonescape)",

    "RTL Dialog | RTL popup | Right to Left Dialog": "[Enable RTL in dialog](https://ej2.syncfusion.com/documentation/api/dialog/#enablertl)",

    "Prevent Dialog opening": "[Prevent opening dialog](https://ej2.syncfusion.com/documentation/dialog/how-to/prevent-opening-of-the-dialog/)",

    "Render dialog using utility functions | Dialog with utility functions": "[Utility functions in dialog](https://ej2.syncfusion.com/documentation/dialog/how-to/render-a-dialog-using-utility-functions/)",

    "Alert Dialog | Popup Alert": "[Alert dialog](https://ej2.syncfusion.com/documentation/dialog/how-to/render-a-dialog-using-utility-functions/#alert-dialog)",

    "Confirmation Dialog | Confirmation popup": "[Confirmation popup in dialog](https://ej2.syncfusion.com/documentation/dialog/how-to/render-a-dialog-using-utility-functions/#render-a-confirmation-dialog-with-options/)",

    "Read Values from dialog | Dialog Value": "[Button click in dialog](https://ej2.syncfusion.com/documentation/dialog/how-to/read-all-the-values-from-dialog-on-button-click/)",

    "Prevent closing of Modal Dialog": "[prevent closing modal dialog](https://ej2.syncfusion.com/documentation/dialog/how-to/prevent-closing-of-modal-dialog/)",

    "Dialog without Header | Popup without Header": "[Dialog without header](https://ej2.syncfusion.com/documentation/dialog/how-to/render-a-dialog-without-header/)",

    "Nested Dialog | Nested popup": "[Nested dialog](https://ej2.syncfusion.com/documentation/dialog/how-to/create-nested-dialog/)",

    "Render textbox inside Dialog | Textbox within popup": "[Numeric textbox in dialog](https://www.syncfusion.com/forums/139165/numerictextbox-inside-a-dialog/)",

    "Create Dialog at runtime": "[injecting component in dialog](https://www.syncfusion.com/forums/135550/creating-dialog-at-runtime-and-injecting-a-component/)",

    "Show Dialog when needed": "[Showing the dialog](https://www.syncfusion.com/forums/137256/show-dialog-only-when-needed)",

    "Refresh Dialog | Refresh Popup": "[Refresh dialog](https://www.syncfusion.com/forums/136754/refresh-dialog)",

    "Z-Index for Dialog | Popup z-index": "[Z-index in dialog](https://ej2.syncfusion.com/documentation/api/dialog/#zindex/)",

    "Hide Popup": "[Hide popup in dialog](https://ej2.syncfusion.com/documentation/api/dialog/#hide)",

    "Show Popup": "[show popup in dialog](https://ej2.syncfusion.com/documentation/api/dialog/#show)"
};

let garbageString = ['in', 'is', 'and', 'or', 'for', 'how', 'the', 'an', 'was', 'when', 'where', 'a', 'this', 'to', 'use'];
global.filter = function (searchValue, syncData) {
    let SyncKeys = Object.keys(syncData);
    let occurence = [];
    SyncKeys.filter(function (value, index) {
        value = value.toLowerCase();
        occurence[index] = 0;
        searchValue.trim().split(' ').forEach(function (splitValue) {
            splitValue = splitValue.toLowerCase();
            if (value.trim().split(' ').indexOf(splitValue) !== -1 && garbageString.indexOf(splitValue) === -1) {
                occurence[index]++;
            };
        });
        return occurence[index];
    });
    return { keys: SyncKeys, occurence: occurence };
}