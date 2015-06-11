/**
 * Created by Administrator on 2015/6/2.
 */
var GSTouchLayer = cc.Layer.extend({
    layouts: null,
    arrBox: null,
    centerWidth: 0,
    centerHeight: 0,
    ctor: function () {
        this._super();

        //加载化中间布局
        this.initLayouts();
        //加载checkBox
        this.initCheckBox();
        //加载中间对话层
        this.loadDialogLayer();
        //加载返回按钮
        this.loadBackBtn();

    },
    initLeftLayout: function () {
        var layout = new ccui.Layout();
        var node1 = new cc.Sprite(res.option_setting_bg_png);
        layout.addChild(node1, 1);

        //加载音效按钮
        var soundButton = new ccui.Button();
        var obj =new CCButton(soundButton, res.option_switch_off_png, res.option_switch_on_png,res.option_soundfx_off_png, res.option_soundfx_on_png);
        obj.setCallBack(this.soundSetting);
        if (V.soundState) {
            soundButton.loadTextures(res.option_switch_on_png,res.option_switch_on_png);
            var bg = new ccui.ImageView(res.option_soundfx_on_png);
            soundButton.addChild(bg,1,0);
            bg.setAnchorPoint(0.5,0.5);
            bg.x=soundButton.width/2;
            bg.y=soundButton.height/2;
            soundButton.setTag(0);
        } else {
            soundButton.loadTextures(res.option_switch_off_png,res.option_switch_off_png);
            var bg = new ccui.ImageView(res.option_soundfx_off_png);
            soundButton.addChild(bg,1,1);
            bg.setAnchorPoint(0.5,0.5);
            bg.x=soundButton.width/2;
            bg.y=soundButton.height/2;
            soundButton.setTag(1);
        }

        layout.addChild(soundButton, 2);
        soundButton.x = -110;
        soundButton.y = 130;



        // 加载背景音乐按钮
        var musicButton = new ccui.Button(res.option_switch_on_png, res.option_switch_on_png);
        var obj = new CCButton(musicButton, res.option_switch_off_png, res.option_switch_on_png,res.option_bgmusic_off_png, res.option_bgmusic_on_png);
        if (V.backgroundMusicState) {
            musicButton.loadTextures(res.option_switch_on_png,res.option_switch_on_png);
            var bg = new ccui.ImageView(res.option_bgmusic_on_png);
            musicButton.addChild(bg,1,0);
            bg.setAnchorPoint(0.5,0.5);
            bg.x=musicButton.width/2;
            bg.y=musicButton.height/2;
            musicButton.setTag(0);
        } else {
            musicButton.loadTextures(res.option_switch_off_png,res.option_switch_off_png);
            var bg = new ccui.ImageView(res.option_bgmusic_off_png);
            musicButton.addChild(bg,1,1);
            bg.setAnchorPoint(0.5,0.5);
            bg.x=musicButton.width/2;
            bg.y=musicButton.height/2;
            musicButton.setTag(1);
        }
        obj.setCallBack(this.musicSetting);
        layout.addChild(musicButton, 3);
        musicButton.x = -110;
        musicButton.y = -20;


        //加载重置游戏按钮
        var resetButton = new ccui.Button();
        resetButton.loadTextures(res.btn_red_m_png, res.btn_red_m_pressed_png);
        resetButton.x = -180;
        resetButton.y = -170;
        layout.addChild(resetButton, 3);
        var care = new ccui.ImageView(res.option_setting_reset_png);
        care.x = resetButton.width / 2;
        care.y = resetButton.height / 2;
        care.setAnchorPoint(0.5, 0.5);
        resetButton.addChild(care);


        // 加载登陆微博按钮
        var webButton = new ccui.Button();
        webButton.loadTextures(res.btn_green_m_png, res.btn_green_m_pressed_png);
        webButton.x = 180;
        webButton.y = -20;
        layout.addChild(webButton);
        var title = new ccui.ImageView(res.option_setting_connect_png);
        title.x = webButton.width / 2;
        title.y = webButton.height / 2;
        title.setAnchorPoint(0.5, 0.5);
        webButton.addChild(title);
        //加载输入兑换码按钮
        var cdkButton = new ccui.Button();
        cdkButton.loadTextures(res.btn_blue_m_png, res.btn_blue_m_pressed_png);
        cdkButton.x = 180;
        cdkButton.y = -170;
        layout.addChild(cdkButton);
        var title = new ccui.ImageView(res.option_setting_code_png);
        title.x = cdkButton.width / 2;
        title.y = cdkButton.height / 2;
        title.setAnchorPoint(0.5, 0.5);
        cdkButton.addChild(title);

        //加载登陆新浪微博Text
        var sinaImage = new ccui.ImageView(res.option_setting_weibo_png);
        sinaImage.x = 180;
        sinaImage.y = 130;
        sinaImage.setAnchorPoint(0.5, 0.5);
        layout.addChild(sinaImage);


        this.centerHeight = node1.height;
        this.centerWidth = node1.width;
        return layout;
    },
    soundSetting: function (node) {
        V.soundState = !V.soundState;
    },
    musicSetting: function () {
        if(!cc.audioEngine.isMusicPlaying()){
            V.backgroundMusicState=true;
            cc.audioEngine.playMusic(res.BGMusic_mp3,true);
        }else{
            V.backgroundMusicState=false;
            cc.audioEngine.stopMusic();
        }

    },

    initCenterLayout: function () {
        var layout = new ccui.Layout();
        var node2 = new cc.Sprite(res.option_data_bg_png);
        layout.addChild(node2,1);


        //加载iCloud同步开关
        var iCloudButton = new ccui.Button(res.option_switch_on_png, res.option_switch_on_png);
        var obj = new CCButton(iCloudButton, res.option_switch_off_png, res.option_switch_on_png,res.option_gamecenter_off_png, res.option_gamecenter_on_png);
        if (V.iCloudState) {
            iCloudButton.loadTextures(res.option_switch_on_png,res.option_switch_on_png);
            var bg = new ccui.ImageView(res.option_gamecenter_on_png);
            iCloudButton.addChild(bg,1,0);
            bg.setAnchorPoint(0.5,0.5);
            bg.x=iCloudButton.width/2;
            bg.y=iCloudButton.height/2;
            iCloudButton.setTag(0);
        } else {
            iCloudButton.loadTextures(res.option_switch_off_png,res.option_switch_off_png);
            var bg = new ccui.ImageView(res.option_gamecenter_off_png);
            iCloudButton.addChild(bg,1,1);
            bg.setAnchorPoint(0.5,0.5);
            bg.x=iCloudButton.width/2;
            bg.y=iCloudButton.height/2;
            iCloudButton.setTag(1);
        }
        obj.setCallBack(this.musicSetting);
        layout.addChild(iCloudButton, 3);
        iCloudButton.x = -190;
        iCloudButton.y = 170;


        //加载GameCenter开关
        var gameCenterButton = new ccui.Button(res.option_switch_on_png, res.option_switch_on_png);
        var obj = new CCButton(gameCenterButton, res.option_switch_off_png, res.option_switch_on_png,res.option_gamecenter_off_png, res.option_gamecenter_on_png);
        if (V.gameCenterState) {
            gameCenterButton.loadTextures(res.option_switch_on_png,res.option_switch_on_png);
            var bg = new ccui.ImageView(res.option_gamecenter_on_png);
            gameCenterButton.addChild(bg,1,0);
            bg.setAnchorPoint(0.5,0.5);
            bg.x=gameCenterButton.width/2;
            bg.y=gameCenterButton.height/2;
            gameCenterButton.setTag(0);
        } else {
            gameCenterButton.loadTextures(res.option_switch_off_png,res.option_switch_off_png);
            var bg = new ccui.ImageView(res.option_gamecenter_off_png);
            gameCenterButton.addChild(bg,1,1);
            bg.setAnchorPoint(0.5,0.5);
            bg.x=gameCenterButton.width/2;
            bg.y=gameCenterButton.height/2;
            gameCenterButton.setTag(1);
        }
        obj.setCallBack(gameCenterSetting);
        layout.addChild(gameCenterButton, 3);
        gameCenterButton.x = -190;
        gameCenterButton.y = 25;

        //加载排行榜按钮
        var chartsbButton = new ccui.Button();
        chartsbButton.loadTextures(res.btn_blue_m_png, res.btn_blue_m_pressed_png);
        chartsbButton.x = -235;
        chartsbButton.y = -70;
        layout.addChild(chartsbButton);
        var title = new ccui.ImageView("res/GameSetting/option_data_chart.png");
        title.x = chartsbButton.width / 2;
        title.y = chartsbButton.height / 2;
        title.setAnchorPoint(0.5, 0.5);
        chartsbButton.addChild(title);




        //加载成就按钮
        var achievementButton = new ccui.Button();
        achievementButton.loadTextures(res.btn_blue_m_png, res.btn_blue_m_pressed_png);
        achievementButton.x = -235;
        achievementButton.y = -150;
        layout.addChild(achievementButton);
        var title = new ccui.ImageView("res/GameSetting/option_data_arch.png");
        title.x = achievementButton.width / 2;
        title.y = achievementButton.height / 2;
        title.setAnchorPoint(0.5, 0.5);
        achievementButton.addChild(title);

        if(V.gameCenterState){
            chartsbButton.setOpacity(255);
            achievementButton.setOpacity(255);
        }else{
            chartsbButton.setOpacity(100);
            achievementButton.setOpacity(100);
            chartsbButton.setTouchEnabled(false);
            achievementButton.setTouchEnabled(false);
        }
        function gameCenterSetting (){
            V.gameCenterState =!V.gameCenterState;
            if(V.gameCenterState){
                chartsbButton.setOpacity(255);
                achievementButton.setOpacity(255);
                chartsbButton.setTouchEnabled(true);
                achievementButton.setTouchEnabled(true);
            }else{
                chartsbButton.setOpacity(100);
                chartsbButton.setTouchEnabled(false);
                achievementButton.setOpacity(100);
                achievementButton.setTouchEnabled(false);
            }

        };
        return layout;

    },
    initRightLayout: function () {
        var layout = new ccui.Layout();
        var node3 = new cc.Sprite(res.option_about_bg_png);
        layout.addChild(node3,1);
        var downloadButton = new ccui.Button();
        downloadButton.loadTextures(res.option_about_classic_png);
        downloadButton.x = 270;
        downloadButton.y = -140;
        downloadButton.setAnchorPoint(0.5,0.5);
        layout.addChild(downloadButton,2);

        return layout;
    },
    initLayouts: function () {
        this.layouts = new Array();
        this.layouts.push(this.initLeftLayout());
        this.layouts.push(this.initCenterLayout());
        this.layouts.push(this.initRightLayout());
    },
    initCheckBox: function () {
        this.arrBox = new Array();
        var box1 = {
            normalRes: res.option_title_setting_disable_png,
            checkedRes: res.option_title_setting_active_png,
            position: "top",
            clickable: "true"
        }
        var box2 = {
            normalRes: res.option_title_data_disable_png,
            checkedRes: res.option_title_data_active_png,
            position: "top",
            clickable: "true"
        }
        var box3 = {
            normalRes: res.option_title_about_disable_png,
            checkedRes: res.option_title_about_active_png,
            position: "top",
            clickable: "true"
        }
        this.arrBox.push(box1);
        this.arrBox.push(box2);
        this.arrBox.push(box3);
    },
    loadDialogLayer: function () {
        var layer = new DialogLayer();
        layer.initCenterLayer(this.layouts);
        layer.initBoxLayer(this.arrBox, this.centerWidth, this.centerHeight);
        layer.getBoxLayer().setTopCheckBoxPosition("center");
        this.addChild(layer,1);
    },
    loadBackBtn : function(){
        var backButton = new ccui.Button();
        backButton.loadTextures(res.popup_close_png);
        backButton.x = V.w2 + this.centerWidth/2-10;
        backButton.y = V.h2 + this.centerHeight/2-45;
        backButton.setAnchorPoint(0.5,0.5);
        cc.log("backButton: "+ backButton + "　　　backButton．ｘ　：" + backButton.x + "this.height  : " + this.height);
        this.addChild(backButton,99);
        backButton.addTouchEventListener(touchEvent,this);
        function touchEvent (sender, type) {
            switch (type) {
                // 未点击状态
                case  ccui.Widget.TOUCH_BEGAN :
                    break;
                // 点击中移动
                case  ccui.Widget.TOUCH_MOVED :
                    break;
                //点击结束
                case  ccui.Widget.TOUCH_ENDED :
                    var scene = new MainMenuScene();
                    cc.director.runScene(scene);
                    break;
                // 点击取消
                case  ccui.Widget.TOUCH_CANCELED:
                    break;
            }
        }

    }

})