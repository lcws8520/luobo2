/**
 * Created by Administrator on 2015/6/2.
 */
/**
 * Created by Administrator on 2015/5/18.
 */
var DialogLayer = cc.Layer.extend({
    center: {
        width: null,
        height: null,
        layer: null
    },
    startX: 0,
    startY: 0,
    topCount: 0,
    bottomCount: 0,
    leftCount: 0,
    rightCount: 0,
    checkBox: [],
    centerLayer: [],
    radioCheckBox: null,
    currentTag: 0,
    layers : null,
    ctor: function () {
        this._super();
        this.setAnchorPoint(0.5, 0.5)
    },
    initCenterLayer: function (layers) {
        this.layers = layers;
        var layer = new ccui.Layout();
        cc.log(layers.length-1);
        for(var i =layers.length-1 ; i>=0;i--){
            layers[i].setAnchorPoint(0.5, 0.5);
            layers[i].x = cc.winSize.width / 2;
            layers[i].y = cc.winSize.height / 2;
            layer.addChild(layers[i],1,i);
            if(i!=0){
                layers[i].setVisible(false);
            }else{
                layers[i].setVisible(true);
            }
        }
        this.addChild(layer,1);
    },
    initBoxLayer: function (arr, width, height) {
        var layer1 = new BoxLayer(arr, width, height,this);
        this.addChild(layer1, 2, 2)

    },

    getBoxLayer: function () {

        return this.getChildByTag(2);
    },
    getCenteLayer : function (){
        return this.getChildByTag(1);
    },
    switchToLayer : function (n){
        for(var i = 0; i<this.layers.length;i++){
            if(i != n){
                this.layers[i].setVisible(false);
            }else{
                this.layers[i].setVisible(true);
            }
        }
    }

});


var BoxLayer = cc.Layer.extend({
    topArrBox: null,
    bottomArrBox: null,
    leftArrBox: null,
    rightArrBox: null,
    topCount: 0,
    bottomCount: 0,
    leftCount: 0,
    rightCount: 0,
    topStartX: 0,
    leftStartY: 0,
    center: {
        width: null,
        height: null
    },
    MMM : null,
    radioBox : null,
    ctor: function (arrBox, width, height,mmm) {
        this._super();
        this.center.width = width;
        this.center.height = height;
        this.initBox(arrBox);
        this.MMM = mmm;
        return true;
    },
    initBox: function (array) {
        for (var i = 0; i < array.length; i++) {
            var node = new ccui.CheckBox();
            node.loadTextures(array[i].normalRes, array[i].normalRes, array[i].checkedRes,null,null);
            var box = {
                node: node,
                position: array[i].position,
                clickable: array[i].clickable
            }
            node.setTag(i);
            node.setName(array[i].clickable);
            cc.log(node.getName());
            if(i==0){
                node.setSelected(true);
                node.setTouchEnabled(false);
            }
            this.addChild(node, 1, i);
            switch (box.position) {
                case "top":
                    if (this.topArrBox == null) {
                        this.topArrBox = new Array();
                        this.topArrBox.push(box);
                    }
                    else {
                        this.topArrBox.push(box);
                        if(this.topArrBox.length>1){
                            this.radioBox = new RadioCheckbox(this.topArrBox);
                        }
                    }
                    break;
                case "bottom":
                    if (this.bottomArrBox == null) {
                        this.bottomArrBox = new Array();
                        this.bottomArrBox.push(box);
                    }
                    else {
                        this.bottomArrBox.push(box);
                        if(this.bottomArrBox.length>1){
                            this.radioBox = new RadioCheckbox(this.bottomArrBox);
                        }
                    }
                    break;
                case "right":
                    if (this.rightArrBox == null) {
                        this.rightArrBox = new Array();
                        this.rightArrBox.push(box);
                    }
                    else {
                        this.rightArrBox.push(box);
                        if(this.rightArrBox.length>1){
                            this.radioBox = new RadioCheckbox(this.rightArrBox);
                        }
                    }
                    break;
                case "left":
                    if (this.leftArrBox == null) {
                        this.leftArrBox = new Array();
                        this.leftArrBox.push(box);
                    }
                    else {
                        this.leftArrBox.push(box);
                        if(this.leftArrBox.length>1){
                            this.radioBox = new RadioCheckbox(this.leftArrBox);
                        }
                    }
                    break;
            }
            node.addEventListener(this.selectedStateEvent,this);
        }
    },

    selectedStateEvent : function (sender,type){
        switch (type) {
            case  ccui.CheckBox.EVENT_UNSELECTED:
                if(sender.getName()=="true"){
                    this.MMM.switchToLayer(sender.getTag()+1);
                    cc.log("sender.getTag() : 0  "+sender.getTag());
                }
                if(sender.getName=="true"){
                    this.MMM.switchToLayer(sender.getTag()+1);
                    cc.log("sender.getTag() : 0  "+sender.getTag());
                }
                break;
            case ccui.CheckBox.EVENT_SELECTED:
                cc.log("this.radioBox : "+this.radioBox);
                if(this.radioBox!=null){
                    this.radioBox.isClick(sender.getTag());
                    cc.log("sender.getTag() : 1  "+sender.getTag());
                    this.MMM.switchToLayer(sender.getTag());
                }else{
                    cc.log("sender.getTag() : 2  "+sender.getTag());
                    this.MMM.switchToLayer(sender.getTag());
                }
                break;
            default:
                break;
        }
    },

    /*
     * 设置每个方向复选框的方法
     *
     * */
    setTopCheckBoxPosition: function (position) {
        if (position == undefined) {
            this.topStartX = cc.winSize.width / 2 - ((this.topArrBox.length - 1) * this.topArrBox[0].node.width) / 2;
        } else {

            this.setTopPostion(position);
        }
        for (var i = 0; i < this.topArrBox.length; i++) {
            this.topArrBox[i].node.x = this.topStartX + ((i * this.topArrBox[i].node.width + i * (10)));
            this.topArrBox[i].node.y = cc.winSize.height / 2 + this.center.height / 2;

        }
    },
    setBottomCheckBoxPosition: function (position) {
        if (position == undefined) {
            this.topStartX = cc.winSize.width / 2 - ((this.bottomArrBox.length - 1) * this.bottomArrBox[0].node.width) / 2;
        } else {

            this.setBottomPosition(position);
        }
        for (var i = 0; i < this.bottomArrBox.length; i++) {
            this.bottomArrBox[i].node.x = this.topStartX + ((i * this.bottomArrBox[i].node.width + i * (10)));
            this.bottomArrBox[i].node.y = cc.winSize.height / 2 - this.center.height / 2 - this.bottomArrBox[i].node.height / 2;
            cc.log("this.bottomArrBox[i].node.x ::   " + this.bottomArrBox[i].node.x + "       this.bottomArrBox[i].node.y: " + this.bottomArrBox[i].node.y);
        }
    },
    setLeftCheckBoxPosition: function (position) {
        if (position == undefined) {
            this.leftStartY = cc.winSize.width / 2 - ((this.leftArrBox.length - 1) * this.leftArrBox[0].node.width) / 2;
        } else {
            this.setLeftPosition(position);
        }
        for (var i = 0; i < this.leftArrBox.length; i++) {
            this.leftArrBox[i].node.x = cc.winSize.width / 2 - this.center.width / 2 - this.leftArrBox[i].node.width / 2;
            this.leftArrBox[i].node.y = this.leftStartY - (i * this.leftArrBox[i].node.height );
            if (position == "top") {
                this.leftArrBox[i].node.y -= 50;
            }
        }

    },
    setRightCheckBoxPosition: function (position) {
        if (position == undefined) {
            this.leftStartY = cc.winSize.width / 2 - ((this.rightArrBox.length - 1) * this.rightArrBox[0].node.width) / 2;
        } else {
            this.setRightPosition(position);
        }
        for (var i = 0; i < this.rightArrBox.length; i++) {
            this.rightArrBox[i].node.x = cc.winSize.width / 2 + this.center.width / 2 + this.rightArrBox[i].node.width / 2;
            this.rightArrBox[i].node.y = this.leftStartY - (i * this.rightArrBox[i].node.height );
            if (position == "top") {
                this.rightArrBox[i].node.y -= 100;
            }
        }
    },
    setTopPostion: function (position) {
        switch (position) {
            case  "left":
                this.topStartX = cc.winSize.width / 2 - this.center.width / 2 + 30;
                break;
            case  "center" :
                this.topStartX = cc.winSize.width / 2 - ((this.topArrBox.length - 1) * this.topArrBox[0].node.width) / 2;
                break;
            case   "right"  :
                this.topStartX = cc.winSize.width / 2 + this.center.width / 2 - (this.topArrBox.length - 1) * this.topArrBox[0].node.width - 80;
                break;
        }
    },
    setRightPosition: function (position) {
        switch (position) {
            case  "top":
                this.leftStartY = cc.winSize.height / 2 + this.center.height / 2
                break;
            case  "center" :
                this.leftStartY = cc.winSize.height / 2 + ((this.rightArrBox.length - 1) * this.rightArrBox[0].node.height) / 2;
                break;
            //暂时看起来效果不太好,感觉没什么需求就没写
            case   "bottom"  :
                break;
        }

    },
    setLeftPosition: function (position) {
        switch (position) {
            case  "top":
                this.leftStartY = cc.winSize.height / 2 + this.center.height / 2
                break;
            case  "center" :
                this.leftStartY = cc.winSize.height / 2 + ((this.leftArrBox.length - 1) * this.leftArrBox[0].node.height) / 2;
                break;
            //暂时看起来效果不太好,感觉没什么需求就没写
            case   "bottom"  :
                break;
        }
    },
    setBottomPosition: function (position) {
        switch (position) {
            case  "left":
                this.topStartX = cc.winSize.width / 2 - this.center.width / 2 + 30;
                break;
            case  "center" :
                this.topStartX = cc.winSize.width / 2 - ((this.bottomArrBox.length - 1) * this.bottomArrBox[0].node.width) / 2;
                break;
            case   "right"  :
                this.topStartX = cc.winSize.width / 2 + this.center.width / 2 - (this.bottomArrBox.length - 1) * this.bottomArrBox[0].node.width - 80;
                break;
        }
    },
    needToRadioCheck : function(position){
        switch (position) {
            case "top":

                break;
            case "bottom":
                break;
            case "right":
                break;
            case "left":
                break;
        }
    }
})


var RadioCheckbox  = cc.Node.extend({
    arrbox  : null,
    ctor : function(arrBox){
        this._super();
        this.arrbox = arrBox;
    },
    isClick : function (tag) {
        cc.log(tag);
        for (var i = 0; i< this.arrbox.length; i++){
            cc.log("this.arrbox[i].tag : " + this.arrbox[i].tag+"    tag  : "+tag)
            if(i== tag){
                //this.arrbox[i].node.setSelected(true);
                this.arrbox[i].node.setTouchEnabled(false);

            }else{
                this.arrbox[i].node.setSelected(false);
                this.arrbox[i].node.setTouchEnabled(true);
            }
        }
    }
})

