/**
 * Created by lingjianfeng on 15/5/12.
 */

var MMMainLayer = cc.Layer.extend({
    isUpLock        : true,     // 锁定[天天向上]
    menu            : null,     // 菜单[主菜单]
    actionDuration  : 1,        // 时间[动作]
    hasTouchUIArr   : null,     // 数组[UI]_具有点击事件的按钮集
    ctor : function () {
        this._super();
        // 加载[配置]
        this.loadConfig();
        // 加载[菜单]_开始冒险_天天向上
        this.loadMenu();
        // 加载[设置]
        this.loadSet();
        // 加载[帮助]
        this.loadHelp();
        // 加载[怪物]_底部
        this.loadBackMonster();
        // 加载[烟雾]_底部
        this.loadBackSmoke();
        // 加载[怪物]_前面
        this.loadForeMonster();
        // 加载[烟雾]_前面
        this.loadForeSmoke();
        // 加载[萝卜]
        this.loadCarrot();
        // 加载[前景]
        this.loadForeground();
        // 加载[背景音乐]
        this.loadBackgroundMusic();
        return true;
    },
    loadConfig : function(sender){
        this.isUpLock = cc.sys.localStorage.getItem("isUpLock") || true;
        this.hasTouchUIArr = new Array();
    },
    loadMenu : function(){
        // 开始冒险
    	var startNormal    = new cc.Sprite("res/MainMenu/front_btn_start_normal.png");
        var startSelected  = new cc.Sprite("res/MainMenu/front_btn_start_pressed.png");
        var startDisabled  = new cc.Sprite("res/MainMenu/front_btn_start_normal.png");
        var start = new cc.MenuItemSprite(
            startNormal,
            startSelected,
            startDisabled,
            function(){
                cc.log("点击开始冒险");
                var scene = new GameChooseScene();
                cc.director.runScene(scene);
            }.bind(this));
        start.setPosition(V.w2 - 8, V.h2 + 75);

        // 天天向上
        var floorNormal    = new cc.Sprite("res/MainMenu/front_btn_floor_normal.png");
        var floorSelected  = new cc.Sprite("res/MainMenu/front_btn_floor_pressed.png");
        var floorDisabled  = new cc.Sprite("res/MainMenu/front_btn_floor_normal.png");
        var floor = new cc.MenuItemSprite(
            floorNormal,
            floorSelected,
            floorDisabled,
            function(){
                if (this.isUpLock){
                    var layer = new MMTipLayer(this);
                    this.addChild(layer);
                }
            }.bind(this));
        floor.setPosition(V.w2 - 8, V.h2 - 45);

        var menu = new cc.Menu(start, floor);
        this.addChild(menu);
        menu.setPosition(0, 0);

        this.menu = menu;

        if (this.isUpLock){
            var lockNode = new cc.Sprite("res/MainMenu/front_btn_floor_locked.png");
            floor.addChild(lockNode);
            lockNode.setPosition(floor.width, floor.height - 35);
        }
    },
    loadSet : function(){
        var node = new cc.Sprite("res/MainMenu/front_monster_4.png");
        this.addChild(node);
        node.setPosition(V.w2 - 350, 490);

        var moveBy1 = cc.moveBy(this.actionDuration, cc.p(0, -10));
        var moveBy2 = cc.moveBy(this.actionDuration, cc.p(0, 10));
        var seq = cc.sequence(moveBy1, moveBy2);
        var action = seq.repeatForever();
        node.runAction(action);

        var set = new ccui.Button();
        node.addChild(set);
        set.setPosition(157, 80);
        set.setTouchEnabled(true);
        set.loadTextures("res/MainMenu/front_btn_setting_normal.png", "res/MainMenu/front_btn_setting_pressed.png", "");
        set.addTouchEventListener(function(sender, type){
            switch (type) {
                case ccui.Widget.TOUCH_BEGAN:
                    break;
                case ccui.Widget.TOUCH_MOVED:
                    break;
                case ccui.Widget.TOUCH_ENDED:
                    var scene = new GameSetScene();
                    cc.director.runScene(scene);
                    break;
                case ccui.Widget.TOUCH_CANCELED:
                    break;
                default:
                    break;
            }
        } ,this);

        this.hasTouchUIArr.push(set);
    },
    loadForeground : function(){
        var node = new cc.Sprite("res/MainMenu/front_front.png");
        this.addChild(node);
        node.setPosition(V.w2, V.h2);
    },
    loadHelp : function(){
        var node = new cc.Sprite("res/MainMenu/front_monster_6.png");
        this.addChild(node);
        node.setPosition(V.w2 + 270, 270);

        var rotateBy1 = cc.rotateBy(this.actionDuration * 0.8, -5);
        var rotateBy2 = cc.rotateBy(this.actionDuration * 0.8, 5);
        var seq = cc.sequence(rotateBy1, rotateBy2);
        var action = seq.repeatForever();
        node.runAction(action);

        var help = new ccui.Button();
        node.addChild(help);
        help.setPosition(155, 365);
        help.setTouchEnabled(true);
        help.loadTextures("res/MainMenu/front_btn_help_normal.png", "res/MainMenu/front_btn_help_pressed.png", "");
        help.addTouchEventListener(function(sender, type){
            switch (type) {
                case ccui.Widget.TOUCH_BEGAN:
                    break;
                case ccui.Widget.TOUCH_MOVED:
                    break;
                case ccui.Widget.TOUCH_ENDED:
                    break;
                case ccui.Widget.TOUCH_CANCELED:
                    break;
                default:
                    break;
            }
        } ,this);

        this.hasTouchUIArr.push(help);

        var mask = new cc.Sprite("res/MainMenu/front_monster_5.png");
        this.addChild(mask);
        mask.setPosition(V.w2 + 400, 280);

        var maskMoveBy1 = cc.moveBy(this.actionDuration * 2, cc.p(0, 5));
        var maskMoveBy2 = cc.moveBy(this.actionDuration * 2, cc.p(0, -5));
        var maskSeq = cc.sequence(maskMoveBy1, maskMoveBy2);
        var maskAction = maskSeq.repeatForever();
        mask.runAction(maskAction);
    },
    loadBackMonster : function(){
        var leftYellow = new cc.Sprite("res/MainMenu/front_monster_3.png");
        this.addChild(leftYellow);
        leftYellow.setPosition(V.w2 - 360, 220);

        var yellowMoveBy1 = cc.moveBy(this.actionDuration * 0.8, cc.p(0, 5));
        var yellowMoveBy2 = cc.moveBy(this.actionDuration * 0.8, cc.p(0, -5));
        var yellowSeq = cc.sequence(yellowMoveBy1, yellowMoveBy2);
        var yellowAction = yellowSeq.repeatForever();
        leftYellow.runAction(yellowAction);

        var leftGreen = new cc.Sprite("res/MainMenu/front_monster_1.png");
        this.addChild(leftGreen);
        leftGreen.setPosition(V.w2 - 300, 185);

        var greenMoveBy1 = cc.moveBy(this.actionDuration * 0.7, cc.p(-3, 0));
        var greenMoveBy2 = cc.moveBy(this.actionDuration * 0.7, cc.p(3, 0));
        var greenSeq = cc.sequence(greenMoveBy1, greenMoveBy2);
        var greenAction = greenSeq.repeatForever();
        leftGreen.runAction(greenAction);
    },
    loadBackSmoke : function(){
        var left = new cc.Sprite("res/MainMenu/front_smoke_1.png");
        this.addChild(left);
        left.setPosition(V.w2 - 410, 188);

        var right = new cc.Sprite("res/MainMenu/front_smoke_3.png");
        this.addChild(right);
        right.setPosition(V.w2 + 405, 190);

    },
    loadForeMonster : function(){
        var rightYellow = new cc.Sprite("res/MainMenu/front_monster_7.png");
        this.addChild(rightYellow);
        rightYellow.setPosition(V.w2 + 290, 185);

        var yellowMoveBy1 = cc.moveBy(this.actionDuration * 0.85, cc.p(-3, 0));
        var yellowMoveBy2 = cc.moveBy(this.actionDuration * 0.85, cc.p(3, 0));
        var yellowSeq = cc.sequence(yellowMoveBy1, yellowMoveBy2);
        var greenAction = yellowSeq.repeatForever();
        rightYellow.runAction(greenAction);

        var leftCambridgeBlue = new cc.Sprite("res/MainMenu/front_monster_2.png");
        this.addChild(leftCambridgeBlue);
        leftCambridgeBlue.setPosition(V.w2 - 220, 170);

        var blueMoveBy1 = cc.moveBy(this.actionDuration * 0.55, cc.p(0, -5));
        var blueMoveBy2 = cc.moveBy(this.actionDuration * 0.55, cc.p(0, 5));
        var blueSeq = cc.sequence(blueMoveBy1, blueMoveBy2);
        var blueAction = blueSeq.repeatForever();
        leftCambridgeBlue.runAction(blueAction);
    },
    loadForeSmoke : function(){
        var node = new cc.Sprite("res/MainMenu/front_smoke_2.png");
        this.addChild(node);
        node.setPosition(V.w2 + 320, 150);
    },
    loadCarrot : function(){
        var node = new cc.Sprite("res/MainMenu/front_carrot.png");
        this.addChild(node);
        node.setPosition(V.w2 + 320, 120);
        node.setScale(0.75);

        var controlPointsTo = [
            cc.p(V.w2 + 400, 100),
            cc.p(V.w2 + 120, 0),
            cc.p(V.w2 + 100, 20)];
        var bezierTo = cc.bezierTo(0.8, controlPointsTo);
        node.runAction(bezierTo);
    },
    setAllButtonEnabled : function(enbaled){
        this.menu.setEnabled(enbaled);

        for (var i = 0; i < this.hasTouchUIArr.length; i++){
            this.hasTouchUIArr[i].setTouchEnabled(enbaled);
        }
    },
    loadBackgroundMusic : function (){
         if(V.backgroundMusicState){
             if (cc.audioEngine.isMusicPlaying()){
                 return;
             }
             cc.audioEngine.playMusic(res.BGMusic_mp3, true);
         }
    }

});