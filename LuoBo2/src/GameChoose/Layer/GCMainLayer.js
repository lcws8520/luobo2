/**
 * Created by Administrator on 2015/6/8.
 */
var GCMainLayer = cc.Layer.extend({
    scrollView: null,
    TAG_BUTTONLAYER: 25,
    ctor: function () {
        this._super()
        //加载地图
        this.loadTiledMap();
        //加载顶部功能按钮
        this.loadTopFunctionBtn();
        //加载当前关卡特效
        this.loadCurrentLevelEffects(3);
    },
    loadTopFunctionBtn: function () {
        //加载左上角功能按钮
        this.loadLeftLayout();
        //记载中间促销按钮
        this.loadDiscounBtn();
        //加载右上角生命星
        this.loadLifeStar();


    },
    //加载[左上角功能按钮]
    loadLeftLayout: function () {
        var leftLayout = new ccui.ImageView("res/GameChoose/stagemap_toolbar_leftbg.png");
        leftLayout.x = leftLayout.width;
        leftLayout.y = V.h;
        leftLayout.setAnchorPoint(1, 1);
        this.addChild(leftLayout);

        //返回首页按钮
        var homeBtn = new ccui.Button();
        homeBtn.loadTextures("res/GameChoose/stagemap_toolbar_home.png", "res/GameChoose/stagemap_toolbar_home.png");
        homeBtn.setPressedActionEnabled(true);
        homeBtn.setZoomScale(0.2);
        homeBtn.x = 10;
        homeBtn.y = 10;
        homeBtn.setAnchorPoint(0, 0);
        leftLayout.addChild(homeBtn);
        this.onButtonClick(homeBtn, function () {
                alert("你是猪么?");
            }
        );


        //购物车按钮
        var shopBtn = new ccui.Button();
        shopBtn.loadTextures("res/GameChoose/stagemap_toolbar_shop.png", "res/GameChoose/stagemap_toolbar_shop.png");
        shopBtn.setPressedActionEnabled(true);
        shopBtn.setZoomScale(0.2);
        shopBtn.x = 12 + shopBtn.width;
        shopBtn.y = 10;
        shopBtn.setAnchorPoint(0, 0);
        leftLayout.addChild(shopBtn);
        this.onButtonClick(shopBtn, function () {
                alert("你才是猪呢");
            }
        );

        //排行榜按钮
        var rankBtn = new ccui.Button();
        rankBtn.loadTextures("res/GameChoose/stagemap_toolbar_leaderboard.png", "res/GameChoose/stagemap_toolbar_leaderboard.png");
        rankBtn.setPressedActionEnabled(true);
        rankBtn.setZoomScale(0.2);
        rankBtn.x = 12 + rankBtn.width * 2;
        rankBtn.y = 10;
        rankBtn.setAnchorPoint(0, 0);
        leftLayout.addChild(rankBtn);
        this.onButtonClick(rankBtn, function () {
                alert("反正我不是猪");
            }
        );
    },
    //加载[中间促销按钮]
    loadDiscounBtn: function () {

        //中间促销按钮
        var button = new ccui.Button();
        var resourceStr = "res/GameChoose/zh/discount_tag_" + V.discountName + ".png"
        button.loadTextures(resourceStr, resourceStr);
        button.x = V.w2;
        button.y = V.h;
        button.setAnchorPoint(0.5, 1);
        this.addChild(button);


        //促销折数的图片层
        var discountImg = new ccui.ImageView("res/GameChoose/zh/discount_tag_" + V.discountNum + "zhe.png");
        discountImg.setAnchorPoint(0, 0);
        button.addChild(discountImg);
    },

    //加载[右上角生命星]
    loadLifeStar: function () {
        var layout = new ccui.Layout();
        layout.x = V.w;
        layout.y = V.h;
        layout.setAnchorPoint(1, 1);


        //右边生命数量的背景框
        var image = new ccui.ImageView("res/GameChoose/stagemap_toolbar_rightbg.png");
        layout.addChild(image);
        image.setAnchorPoint(1, 1);
        this.addChild(layout);

        //生命星星的图片背景
        var starImage = new ccui.ImageView("res/GameChoose/zh/stagemap_toolbar_overten.png");
        starImage.setAnchorPoint(1, 1);
        layout.addChild(starImage);

    },
    //加载[地图]
    loadTiledMap: function () {
        this.scrollView = new ccui.ScrollView();
        this.scrollView.setTouchEnabled(true);
        this.scrollView.setDirection(ccui.ScrollView.DIR_HORIZONTAL);
        this.scrollView.setContentSize(V.w, V.h);
        var scrollViewRect = this.scrollView.getContentSize();
        this.scrollView.setInnerContainerSize(cc.size(scrollViewRect.width, scrollViewRect.height));
        var map = new cc.TMXTiledMap(res.tmx1_tmx);
        this.scrollView.addChild(map);
        var bgLayer = map.getLayer("bg");
        bgLayer.setAnchorPoint(0.5, 0.5);


        //加载地图背景
        this.loadTiledMapBackGroun(this.scrollView, 1);

        //加载地图按钮对象
        var buttonLayer = this.loadTiledMapObj(map);
        this.scrollView.addChild(buttonLayer, 4, this.TAG_BUTTONLAYER);

        //设置scrollView内部大小
        this.scrollView.setInnerContainerSize(cc.size(map.width, scrollViewRect.height));
        this.addChild(this.scrollView);

        //加载关卡连接线    70是激活了多少关
        this.loadRoute(130, this.scrollView);


    },


    //加载[地图背景]
    loadTiledMapBackGroun: function (per, z) {
        for (var i = 0; i < 14; i++) {
            var layer = new ccui.ImageView("res/GameChoose/stagemap/stagemap_" + (i + 1) + ".png");
            layer.setAnchorPoint(0, 0);
            layer.x = 0 + i * layer.width;
            layer.y = 0
            per.addChild(layer, z);
        }
    },

    //加载[地图对象]
    loadTiledMapObj: function (map) {
        var layer = new cc.Layer();
        var obj = map.getObjectGroup("obj");
        var objs = obj.getObjects();
        for (var i = 0; i < objs.length; i++) {
            var button = new ccui.Button();

            //如果是boss关卡加载boss关的按钮背景.   这个后期要增加判断,对象属性里面要添加一个属性来判断 目前不知道怎么添加
            if (!true) {
                button.loadTextures("res/GameChoose/stagepoint_boss.png", "res/GameChoose/stagepoint_boss.png");
            } else {
                button.loadTextures("res/GameChoose/stagepoint_adv.png", "res/GameChoose/stagepoint_adv.png");
            }
            button.setPosition(objs[i].x, objs[i].y);
            button.setTag(i);
            layer.addChild(button, 1, i);

            button.addTouchEventListener(function (sender, type) {
                switch (type) {
                    case ccui.Widget.TOUCH_BEGAN:
                        break;
                    case ccui.Widget.TOUCH_MOVED:
                        break;
                    case ccui.Widget.TOUCH_ENDED:
                        alert(sender.getTag());
                        break;
                    case ccui.Widget.TOUCH_CANCELED:
                        break;
                    default:
                        break;
                }
            }, this);
        }
        return layer;
    },


    //加载[关卡连接线]
    loadRoute: function (num, per) {
        for (var i = 1; i <= num; i++) {
            var route = new ccui.ImageView("res/ChooseLevel/route/route_" + i + ".png");
            if (i % 10 != 0) {
                route.setAnchorPoint(0.5, 0.5);
            } else {
                route.setAnchorPoint(1, 0.5);
            }

            route.x = V.w2 + Math.floor(i / 10) * per.width + 10;
            cc.log(Math.floor(i / 10));
            route.y = per.getInnerContainerSize().height / 2;
            per.addChild(route, 2);
        }

    },

    //加载[当前关卡的特效]
    loadCurrentLevelEffects: function (num) {
        var node = this.scrollView.getChildByTag(this.TAG_BUTTONLAYER).getChildByTag(num);
        var texiao1 = new cc.Sprite("res/GameChoose/stagemap_local.png");
        var texiao2 = new cc.Sprite("res/GameChoose/stagemap_local.png");
        var texiao3 = new cc.Sprite("res/GameChoose/stagemap_local.png");

        function setEffectPosition(effect) {
            effect.x = node.x;
            effect.y = node.y;
        }

        setEffectPosition(texiao1);
        setEffectPosition(texiao2);
        setEffectPosition(texiao3);
        var action1 = cc.scaleBy(0, 0);
        var action2 = cc.scaleTo(0.5, 1);
        var action3 = cc.fadeOut(0.5);
        var action4 = cc.fadeIn(0);
        var onCallBack1 = cc.callFunc(fcc, this);
        var onCallBack2 = cc.callFunc(fdd, this);
        var onCallBack3 = cc.callFunc(fee, this);
        texiao1.runAction(cc.sequence(action1, action4, action2, onCallBack1, action3));
        function fcc() {
            texiao2.runAction(cc.sequence(action1, action4, action2, onCallBack2, action3));
            cc.log("这个又会怎么样呢?")
        }

        function fdd() {
            texiao3.runAction(cc.sequence(action1, action4, action2, onCallBack3, action3));
        }

        function fee() {
            texiao1.runAction(cc.sequence(action1, action4, action2, onCallBack1, action3));
        }

        this.scrollView.addChild(texiao1, 3);
        this.scrollView.addChild(texiao2, 4);
        this.scrollView.addChild(texiao3, 5);
    },
    //Button添加监听时间方法
    onButtonClick: function (node, callBack) {
        node.addTouchEventListener(function (sender, type) {
            switch (type) {
                case ccui.Widget.TOUCH_BEGAN:
                    break;
                case ccui.Widget.TOUCH_MOVED:
                    break;
                case ccui.Widget.TOUCH_ENDED:
                    callBack();
                    break;
                case ccui.Widget.TOUCH_CANCELED:
                    break;
                default:
                    break;
            }
        }, this);
    }
})