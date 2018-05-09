define(['dojo/_base/declare','dojo/on','dojo/query','dojo/dom-class','jimu/PoolControllerMixin', 'jimu/BaseWidget'],
  function (declare,on,query,domClass, PoolControllerMixin, BaseWidget) {
    //To create a widget, you need to derive from BaseWidget.
    return declare([BaseWidget, PoolControllerMixin], {
      // Custom widget code goes here

      baseClass: 'jimu-widget-sidebar-controller jimu-main-background',
      allConfigs: [],
      openedWidgetId: '',
      activeIconNode: null,

      postCreate: function () {
        this.inherited(arguments);
        this.allConfigs = this.getAllConfigs();

        for (var i = 0; i < this.allConfigs.length; i++) {
          this._createIconNode(this.allConfigs[i]);
        }


      },

      startup: function () {
        this.inherited(arguments);

      },

      _createIconNode: function (iconConfig, targetNode) {
        var iconNode, iconImage;
        if (!targetNode) targetNode = this.containerNode;

        iconNode = document.createElement('DIV');
        iconNode.className = 'icon-node';
        if (iconConfig.icon) {
          iconImage = document.createElement('img');
          iconImage.src = iconConfig.icon;
        }
        if (iconConfig.label) {
          iconNode.title = iconConfig.label;
          iconImage.alt = iconConfig.label;
        }

        iconNode.appendChild(iconImage);
        targetNode.appendChild(iconNode);

        var self = this;
        this.own(on(iconNode, 'click', function() {
          query('.jimu-state-active', self.domNode).removeClass('jimu-state-active');
          if(self.activeIconNode === this) {
            self.panelManager.closePanel(iconConfig.id + '_panel');
            self.activeIconNode = null;
            return;
          }
        
          domClass.add(this, 'jimu-state-active');
          self._showWidgetContent(iconConfig);
          self.activeIconNode = this;
        }));
        
        


        return iconNode;
      },

      _showWidgetContent: function(iconConfig) {
        if(this.openedWidgetId) {
          this.panelManager.closePanel(this.openedWidgetId + '_panel');
        }
        this.panelManager.showPanel(iconConfig);
        this.openedWidgetId = iconConfig.id;
      }
      





    });
  });