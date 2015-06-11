/**
 * Created by Administrator on 2015/6/8.
 */
var GCMainLayer = cc.Layer.extend({
    ctor: function () {
        this._super();

        //加载背景图
        this.loadBackGround();
        //加载顶部功能按钮
        this.loadTopFunctionBtn();


    },
    loadBackGround : function () {
        var scrollView = new ccui.ScrollView();
        scrollView.setTouchEnabled(true);
        scrollView.setDirection(ccui.ScrollView.DIR_HORIZONTAL);
        scrollView.setContentSize(cc.size(V.w, V.h));
        var scrollViewRect  = scrollView.getContentSize();
        scrollView.setInnerContainerSize(cc.size(scrollViewRect.width, scrollViewRect.height));


        var bgSprite1 =  new cc.Sprite(res.stagemap_1_10_png);
        bgSprite1.x = V.w2;
        bgSprite1.y = V.h2;
        scrollView.addChild(bgSprite1);
        scrollView.setInnerContainerSize(cc.size(scrollViewRect.width+bgSprite1.width*4, scrollViewRect.height));

        var bgSprite2 =  new cc.Sprite(res.stagemap_11_20_png);
        bgSprite2.x = V.w2 + bgSprite1.width;
        bgSprite2.y = V.h2 ;
        scrollView.addChild(bgSprite2);

        var bgSprite3 =  new cc.Sprite(res.stagemap_21_30_png);
        bgSprite3.x = V.w2 + bgSprite1.width*2;
        bgSprite3.y = V.h2 ;
        scrollView.addChild(bgSprite3);

        var bgSprite4 =  new cc.Sprite(res.stagemap_31_40_png);
        bgSprite4.x = V.w2 + bgSprite1.width*3;
        bgSprite4.y = V.h2 ;
        scrollView.addChild(bgSprite4);

        var bgSprite5 =  new cc.Sprite(res.stagemap_41_50_png);
        bgSprite5.x = V.w2 + bgSprite1.width*4;
        bgSprite5.y = V.h2 ;
        scrollView.addChild(bgSprite5);
        this.addChild(scrollView);
    },
    loadTopFunctionBtn : function (){
        var leftLayout = new ccui.ImageView(res.stagemap_toolbar_leftbg_png);
        leftLayout.x = leftLayout.width;
        leftLayout.y= V.h;
        leftLayout.setAnchorPoint(1,1);
        this.addChild(leftLayout);

        var homeBtn = new ccui.Button();
        homeBtn.loadTextures(res.stagemap_toolbar_home_png);
        homeBtn.x = 10;
        homeBtn.y = 8;
        homeBtn.setAnchorPoint(0,0);
        leftLayout.addChild(homeBtn);
    }

})