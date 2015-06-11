/**
 * Created by Administrator on 2015/6/2.
 */
var GameSettingLayer = cc.Layer.extend({
    ctor: function () {
        this._super();
        this.initBackgroundLayer();
        this.initTouchLayer();
    },
    initBackgroundLayer: function () {
        var layer = new GSBackGroundLayer();
        this.addChild(layer, 1);
    },
    initTouchLayer: function () {
        var layer = new GSTouchLayer();
        this.addChild(layer, 2)
    }
})


var GameSetScene = cc.Scene.extend({
    onEnter: function () {
        this._super();
        var layer = new GameSettingLayer();
        this.addChild(layer);
    }
})