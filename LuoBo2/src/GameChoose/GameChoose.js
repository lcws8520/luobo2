/**
 * Created by Administrator on 2015/6/8.
 */
var GameChooseLayer = cc.Layer.extend({
    ctor : function (){
        this._super();
        var MainLayer = new GCMainLayer();
        this.addChild(MainLayer);
    }
})















var GameChooseScene = cc.Scene.extend({
    onEnter : function () {
        this._super();
        var layer = new GameChooseLayer();
        this.addChild(layer);
    }
})