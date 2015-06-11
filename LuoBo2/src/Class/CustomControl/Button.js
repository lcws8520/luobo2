/**
 * Created by Administrator on 2015/6/3.
 */
var CCButton = cc.Class.extend({
    _normalRes : null,
    _checkRes : null,
    _callBack : null,
    _normalAddRes : null,
    _checkAddRes : null,
    isSetting : null,
    ctor : function (node,normalRes,checkRes,normalAdd,checkedAdd){
        this._normalRes = normalRes,
        this._checkRes = checkRes
        if(normalAdd!=null){
            this._normalAddRes = new ccui.ImageView(normalAdd);
            this._checkAddRes =new ccui.ImageView(checkedAdd);
        }
        this.loadNode(node);

    },
    loadNode : function(node){
        node.addTouchEventListener(this.touchEvent,this);
    },
    touchEvent: function (sender, type) {
        switch (type) {
            // 未点击状态
            case  ccui.Widget.TOUCH_BEGAN :
                break;
            // 点击中移动
            case  ccui.Widget.TOUCH_MOVED :
                break;
            //点击结束
            case  ccui.Widget.TOUCH_ENDED :
                if(sender.getTag()==1){
                    if(this._checkAddRes!=null) {
                        sender.removeChildByTag(1);
                        sender.addChild(this._checkAddRes,1,0);
                        this._checkAddRes.setAnchorPoint(0.5,0.5);
                        this._checkAddRes.x=sender.width/2;
                        this._checkAddRes.y=sender.height/2;
                    }
                    sender.loadTextures(this._checkRes,this._checkRes);
                    sender.setTag(0);
                }else{
                    if(this._normalAddRes!=null) {
                        sender.removeChildByTag(0)
                        sender.addChild(this._normalAddRes,1,1);
                        this._normalAddRes.setAnchorPoint(0.5,0.5);
                        this._normalAddRes.x=sender.width/2;
                        this._normalAddRes.y=sender.height/2;
                        this._normalAddRes.setAnchorPoint(0.5,0.5);
                    }
                    sender.loadTextures(this._normalRes,this._normalRes);
                    sender.setTag(1);
                }
                this.isSetting();
                break;
            // 点击取消
            case  ccui.Widget.TOUCH_CANCELED:
                break;
        }
    },
    setCallBack : function (Fnc) {
        this.isSetting = Fnc
    }

})