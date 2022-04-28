function Pop() {
    const cssRuleFile = "https://cookieconsent.popupsmart.com/src/css/style.css";
    let lnk = document.createElement("link");
    lnk.setAttribute("rel", "stylesheet");
    lnk.setAttribute("type", "text/css");
    lnk.setAttribute("href", cssRuleFile);
    document.getElementsByTagName("head")[0].appendChild(lnk);
    let styl = "undefined";
    let conDivObj;
    const fadeInTime = 10;
    const fadeOutTime = 10;
    let cookie = {name: "cookieconsent_status", path: "/", expiryDays: 365 * 24 * 60 * 60 * 5000,};
    let content = {
        message: "This website uses cookies to ensure you get the best experience on our website.",
        btnText: "Got it!",
        mode: "  banner bottom",
        theme: " theme-classic",
        palette: " palette1",
        link: "Learn more",
        href: "https://www.cookiesandyou.com",
        target: "_blank",
    };
    let createPopUp = function () {
        console.log(content);
        if (typeof conDivObj === "undefined") {
            conDivObj = document.createElement("DIV");
            conDivObj.style.opacity = 0;
            conDivObj.setAttribute("id", "spopupCont");
        }
        conDivObj.innerHTML = '<div id="poper" class="window ' +
            content.mode +
            content.theme +
            content.palette +
            '"><span id="msg" class="message">' +
            content.message +
            '<a id="plcy-lnk" class="policylink" href="' +
            content.href +
            '"' +
            " target=" +
            content.target +
            ">" +
            content.link +
            '</a></span><div id="btn" class="compliance"><a href="#" id="cookie-btn" class="spopupbtnok" >' +
            content.btnText +
            '</a></div><span class="credit"><a href="https://popupsmart.com" target="_blank"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 60 60" fill="currentColor"><path id="popupsmart" d="M56.627,12.279a22.441,22.441,0,0,0-9.549-9.074c-4.122-2.088-8.951-3.2-15.722-3.2H28.644c-6.769,0-11.6,1.112-15.72,3.2a22.425,22.425,0,0,0-9.551,9.072C1.174,16.191,0,20.783,0,27.214v5.578c0,6.434,1.173,11.024,3.373,14.934A22.412,22.412,0,0,0,12.924,56.8c4.12,2.094,8.949,3.206,15.72,3.206h2.711c6.771,0,11.6-1.112,15.72-3.206a22.427,22.427,0,0,0,9.551-9.072c2.2-3.91,3.373-8.5,3.373-14.934V27.216C60,20.78,58.827,16.19,56.627,12.279ZM30,45.006c-.237,0-.473-.005-.708-.015l-.211-.012c-.14-.008-.28-.019-.419-.031-.123-.011-.245-.022-.367-.036l-.191-.024a14.979,14.979,0,0,1-2.672-.59V44.3a14.861,14.861,0,0,1-6.294-3.955,1.406,1.406,0,1,0-2.036,1.94,17.648,17.648,0,0,0,8.33,4.944v.354a5.214,5.214,0,1,1-10.428,0V30.046c0-.013,0-.026,0-.039a15,15,0,1,1,15,15Z" transform="translate(0 -0.005)"></path></svg><span>Powered by Popupsmart</span></a></span></div>';
        document.body.appendChild(conDivObj);
        fadeIn(conDivObj);
        document.getElementById("cookie-btn").addEventListener("click", function () {
            saveCookie();
            fadeOut(conDivObj);
        });
    };
    let fadeOut = function (element) {
        let op = 1;
        const timer = setInterval(function () {
            if (op <= 0.1) {
                clearInterval(timer);
                conDivObj.parentElement.removeChild(conDivObj);
            }
            element.style.opacity = op;
            element.style.filter = "alpha(opacity=" + op * 100 + ")";
            op -= op * 0.1;
        }, fadeOutTime);
    };
    let fadeIn = function (element) {
        let op = 0.1;
        const timer = setInterval(function () {
            if (op >= 1) {
                clearInterval(timer);
            }
            element.style.opacity = op;
            element.style.filter = "alpha(opacity=" + op * 100 + ")";
            op += op * 0.1;
        }, fadeInTime);
    };
    let checkCookie = function (key) {
        const keyValue = document.cookie.match("(^|;) ?" + key + "=([^;]*)(;|$)");
        return !!keyValue;
    };
    let saveCookie = function () {
        const expires = new Date();
        expires.setTime(expires.getTime() + cookie.expiryDays);
        document.cookie = cookie.name +
            "=" +
            "ok" +
            ";expires=" +
            expires.toUTCString() +
            "path=" +
            cookie.path;
    };
    this.init = function (param) {
        if (checkCookie(cookie.name)) return;
        if (typeof param === "object") {
            if ("ButtonText" in param) content.btnText = param.ButtonText;
            if ("Mode" in param) content.mode = " " + param.Mode;
            if ("Theme" in param) content.theme = " " + param.Theme;
            if ("Palette" in param) content.palette = " " + param.Palette;
            if ("Message" in param) content.message = param.Message;
            if ("LinkText" in param) content.link = param.LinkText;
            if ("Location" in param) content.href = param.Location;
            if ("Target" in param) content.target = param.Target;
            if ("Time" in param)
                setTimeout(function () {
                    createPopUp();
                }, param.Time * 1000); else createPopUp();
        }
    };
}
window.start = new Pop();

window.noodle = {
    releases: {
        PC: {},
        Quest: {}
    },

}

window.onload = async () => {
    $(".navbar-burger").click(function() {

        // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
        $(".navbar-burger").toggleClass("is-active");
        $(".navbar-menu").toggleClass("is-active");

    });
    console.log("Fetching GH releases.")

    let totalDL = 0;

    // PC
    const pc_data = await (await fetch("https://api.github.com/repos/Aeroluna/Heck/releases")).json();
    pc_data.forEach(release => {
        release.assets.forEach(asset => totalDL += asset.download_count);
    });
    
    
    // other
    const bm_data = await (await fetch("/api/v1/BeatMods.json")).json();
    const video_data = await (await fetch("https://video-api.noodleextensions.com/videos.json")).json();
    
    
    const PC = window.noodle.releases.PC = pc_data.filter(release => release["tag_name"].includes("noodle"))[0];
    console.log("Loaded PC");
    
    
    
    max = video_data.amount
    min = 1
    const vid1 = video_data[Math.floor(Math.random() * (max - min + 1)) + min]
    const vid2 = video_data[Math.floor(Math.random() * (max - min + 1)) + min]
    
    if (vid2 == vid1) {
        const vid2 = video_data[Math.floor(Math.random() * (max - min + 1)) + min]
    }
    
    $("#frame1").attr("src", vid1);
    $("#frame2").attr("src", vid2);
    $("#pc_version").html(PC.tag_name.replace("noodleextensions-v", ""));
    $("#pc_download_btn").attr("href", PC.assets[0].browser_download_url);
    $("#pc_title").html(PC.name);
    $("#pc_link").attr("href", PC.html_url);
    $("#beatmods_link").attr("href", bm_data.download_url);

    $("#pcLoadingDoneToRemove").css("display", "initial");
    $("#pcLoadingIndicator").remove();

    const quest_data = await (await fetch("https://api.github.com/repos/StackDoubleFlow/NoodleExtensions/releases")).json();
    quest_data.forEach(release => {
        release.assets.forEach(asset => totalDL += asset.download_count);
    });
    const Quest = window.noodle.releases.Quest = quest_data[0];
    console.log("Loaded Quest");

    $("#quest_version").html(Quest.tag_name.replace("v", ""));
    $("#quest_download_btn").attr("href", Quest.assets[1].browser_download_url);
    $("#quest_title").html(Quest.name);
    $("#quest_link").attr("href", Quest.html_url);

    $("#questLoadingDoneToRemove").css("display", "initial")
    $("#questLoadingIndicator").remove();

    $("#noodle-totalDownloads").html(totalDL)
}
