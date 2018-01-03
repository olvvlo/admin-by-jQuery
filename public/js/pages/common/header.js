function Header(headerContainer, index) {
    this.headerContainer = headerContainer;
    this.selectIndex = index;
    this.init();
}
Header.template = `
    <nav class="navbar navbar-default">
        <div class="container-fluid">
            <div class="navbar-header">
                <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
              <a class="navbar-brand" href="#">后台管理系统</a>
            </div>

            <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                <ul class="nav navbar-nav js-left">
                    <li>
                        <a href="/">首页</a>
                    </li>
                    <li>
                        <a href="/list.html">列表页</a>
                    </li>
                </ul>
                <ul class="nav navbar-nav navbar-right js-right">
                </ul>
            </div>
        </div>
    </nav>
    `;
$.extend(Header.prototype, {
    init() {
        this.createHeader();
        this.getSelectIndex();
        this.getLoginInfo();
    },
    getSelectIndex() {
        var leftArea = this.element.find(".js-left"),
            leftItems = this.element.find("li");
        leftItems.eq(this.selectIndex).addClass("active");
    },
    getLoginInfo() {
        $.ajax({
            url: "/api/isLogin",
            success: $.proxy(this.handleGetLoginSuccess, this)
        })
    },
    handleGetLoginSuccess(res) {
        if (res && res.data && res.data.isLogin) {
            this.createLogout();
        } else {
            this.createLogin();
            this.createRegister();
        }
    },
    createHeader() {
        this.element = $(Header.template);
        this.headerContainer.append(this.element);
        this.rightArea = this.element.find(".js-right");
    },
    createLogin() {
        this.login = new Login(this.rightArea, this.element);
    },
    createRegister() {
        this.register = new Register(this.rightArea, this.element);
    },
    createLogout() {
        this.logout = new Logout(this.rightArea);
    }
})