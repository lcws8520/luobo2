/**
 * Created by lingjianfeng on 15/5/12.
 */

var MMBackgroundLayer = cc.Layer.extend({
    ctor : function () {
        this._super();
        // 加载[背景]
        this.loadBackgound();
        return true;
    },
    loadBackgound : function(){
        var node = new cc.Sprite("res/MainMenu/front_bg.png");
        this.addChild(node);
        node.setPosition(V.w2, V.h2);
    }
});