/**
 * Created by Administrator on 2015/6/2.
 */
var GSBackGroundLayer = cc.Layer.extend({
    ctor : function (){
        this._super();
        var bgSpriter = new cc.Sprite("res/option_bg.png");
        bgSpriter.x= V.w2;
        bgSpriter.y= V.h2;
        bgSpriter.setAnchorPoint(0.5,0.5);
        this.addChild(bgSpriter);
    }
})