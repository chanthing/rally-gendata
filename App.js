/*
   Primitive sample program using the Rally App SDK to bulk create new data (in this case, new
   User Stories) to a project selected by a combo box at the top.

   The only property set in the new User Stories is name. This name is created by appending the
   numbers between 1 and "Count" (entered in the so-named text component) to the string entered in
   the "BaseName" text component.

   There is little to no range checking or error handling, so beware! This is intended for use only 
   on sandbox or text deployments.
*/
Ext.define('CustomApp', {
    extend: 'Rally.app.App',
    componentCls: 'app',
    items:[{ html:'<a href="https://help.rallydev.com/apps/2.0rc2/doc/">App SDK 2.0rc2 Docs</a><br><br><h1>Rally Caveman Data Record Creator</h1>'}],

    /*
        UI Hierarchy is constructed and kicked off.
    */
    launch: function() {
        var app = this;
        var i;
	var projectComboBox, addUserStoryPanel, userStoryStore;
	var currentBaseName, currentCount, userStoryName;

        projectComboBox = Ext.widget('rallycombobox', {
                                        fieldLabel: 'Project: ',
                                        storeConfig: {
                                            autoLoad: true,
                                            model: 'Project'
                                        } });
        this.add(projectComboBox);

        addUserStoryPanel = Ext.create('Ext.panel.Panel', {
                                title: 'Create User Stories',
                                items: [
                                        {xtype: 'rallytextfield',
/*
					 listeners: [{change: function(this, newValue, oldValue, eOpts) {
							  console.log('Count field changed from ', oldValue, ' to ', newValue);
                                                          userStoryName = newValue;
                                                      }}],
*/
                                         fieldLabel: 'BaseName: '},
                                        {xtype: 'rallynumberfield',
                                         fieldLabel: 'Count: ',
/*
					 listeners: [{change: function(this, newValue, oldValue, eOpts) {
							  console.log('Count field changed from ', oldValue, ' to ', newValue);
                                                          currentCount = newValue;
                                                      }}],
*/
                                         minValue: 1,
                                         maxValue: 99,
                                         value: 10},
                                        {xtype: 'toolbar',
                                         items: [{xtype: 'button',
                                                   text: 'Add',
                                                  handler: function() {
                                                          // Do the business
                                                          console.log('Button pressed');
                                                          for (i = 1; i <= currentCount; i++) {
                                                              name = currentBaseName + i;
                                                              console.log('Creating user story: ', storyName); 
                                                          }
                                                        }
                                                }]}
                                        ],
                                renderTo: Ext.getBody()
                                });
        this.add(addUserStoryPanel);

        userStoryStore = Ext.create('Rally.data.wsapi.Store', {
                                                                model: 'User Story',
                                                                listeners: {
                                                                        load: function(store, data, success) {
                                                                             console.log('Data Loaded', store, data, success);
                                                                             }
                                                                        }
                                                                    });

                                                
    }

});
