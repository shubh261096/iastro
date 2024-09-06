﻿$(function () { $("#divLoginSignup").show(), $("#divVerifyOtp").hide(), $("#btnLoginSignupOtp").on("click", function () { $("#spnErrorMessage").text(""); var e, o, i, n = $("#txtPhone").val(), s = "Please enter a valid Phone number!"; if ($("#lblmessage").text(""), $("#lblmessage").hide(), n.length <= 0) return $("#lblmessage").text("Please enter phone number!"), $("#lblmessage").show(), !1; if (e = n, !String(e).match(/^\d{9,15}$/) || isNaN(n) || n.length < 9) return $("#lblmessage").text(s), $("#lblmessage").show(), !1; var r = $("#ddlCountries").val(), l = !0, d = ""; if (Boolean("True" === JsSettings.IsGoogleCaptchaEnable)) { $("#lblmessage").text(""); var c = "Please validate the captcha"; "undefined" != typeof grecaptcha && (c = 0 === (d = grecaptcha.getResponse($("#gCatpchaonLogin").attr("data-widget-id"))).length ? "Captcha verification failed" : "Success!"); var l = "success!" == c.toLowerCase(); $("#lblmessage").text(c), $("#lblmessage").show(), $("#lblmessage").css("color", l ? "green" : "red") } if (l) { t("/user/api/signinsignup", { PhoneNumber: n, DialCode: r, CaptchaResponse: d }, a(100, "signupApiKey"), function (e) { e.isSuccess ? ($("#divLoginSignup").hide(), $("#divVerifyOtp").show(), $("#spnPhone").text(r + "-" + n), $("#lblOTP").text(e.message)) : ($("#lblmessage").show(), $("#lblmessage").text(e.message)), $("#naOverlay").hide() }) } else console.log("Captcha is not success") }); var e = !1; function t(e, t, a, o) { $("#naOverlay").show(), fetch(e, { method: "POST", mode: "cors", headers: { Authorization: `Bearer ${JsSettings.ApiKey}`, "X-Namo-APIKEY": a, "Content-Type": "application/json" }, body: JSON.stringify(t) }).then(function (e) { if (e.ok) return e.json(); $("#lblmessage").show(), $("#lblmessage").text("Slow down! You are making requests too quickly."), $("#naOverlay").hide(), console.error("Network response was not OK.") }).then(function (e) { o(e) }).catch(function (e) { $("#naOverlay").hide(), console.error("Error:", e) }) } function a(e, t) { for (var a = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789", o = "", i = 0; i < e; i++)o += a.charAt(Math.floor(Math.random() * a.length)); var n, s, r, l, d = 3; return n = t, s = o, (r = new Date).setTime(r.getTime() + 18e4), l = "; expires=" + r.toUTCString(), document.cookie = n + "=" + (s || "") + l + "; path=/", o } function o(e) { var t = (e = e || window.event).which ? e.which : e.keyCode; return !(t > 31) || !(t < 48) && !(t > 57) } $("#btnVerifyOtp").on("click", function () { if (e) { console.log("Verify OTP already in progress"); return } var o = $("#txtPhone").val(), i = $("#ddlCountries").val(), n = parseInt($(this).data("astroid"), 10), s = $(this).data("name"); isNaN(n) && (n = 0), $("#spnErrorMessage").text(""); var r = { PhoneNumber: o, DialCode: i, Otp1stDigit: $("#txt1stDigit").val(), Otp2ndDigit: $("#txt2ndDigit").val(), Otp3rdDigit: $("#txt3rdDigit").val(), Otp4thDigit: $("#txt4thDigit").val(), FirstName: s, AstrologerId: n }, l = $("#txt1stDigit").val() + $("#txt2ndDigit").val() + $("#txt3rdDigit").val() + $("#txt4thDigit").val(); l || ($("#lblmessageotp").show(), $("#lblmessageotp").text("Please enter OTP !")), l && o && ($("#naOverlay").show(), e = !0, t("/user/api/ValidateUser", r, a(100, "otpVerifyKey"), function (t) { t.isSuccess ? n <= 0 ? window.location.href = "/useraccount/" : ($("#LoginSignupModel").modal("hide"), 1 == t.data.userWalletCheckOnLogin || 2 == t.data.userWalletCheckOnLogin ? window.location.href = "/useraccount/userdetailform?aId=" + n : window.location.href = "/useraccount/recharge-wallet?aId=" + n) : (e = !1, $("#spnErrorMessage").text(t.message), $("#naOverlay").hide()) })) }), Boolean("True" === JsSettings.IsGoogleCaptchaEnable) ? $("#divReCaptcha").show() : $("#divReCaptcha").hide(), $('[id$="aChatWithAstro"]').click(function () { var e = $(this).data("astroid"); $.ajax({ type: "POST", url: "/api/chat/" + e + "/canchat", headers: { Accept: "application/json", "Content-type": "application/json", Authorization: `Bearer ${JsSettings.ApiKey}` }, data: {}, dataType: "json", success: function (t) { if ($("#naOverlay").hide(), t.isSuccess) { var a = t.data; if (a.isChatRequestInWaiting) $("#LoginSignupModel").modal("show"), $("#spnWarningMessage").text(a.warningMessage), $("#aCheckWalletBalance").hide(); else { var o = "javascript:void(0);"; a.canChatWithAstrologer ? window.location.href = "/useraccount/userdetailform?aId=" + e : ($("#LoginSignupModel").modal("show"), $("#spnWarningMessage").text(a.warningMessage), $("#aCheckWalletBalance").show(), o = "/useraccount/recharge-wallet?aId=" + e), $("#aCheckWalletBalance").attr("href", o) } } else console.log("There is some problem while creating the order. Please try again. If you still face the same problem, please contact the administrator.") } }) }), $('[id$="btnChatWithAstro"]').click(function () { $("#LoginSignupModel").modal("show"); var e = $(this).data("astroid"), t = $(this).data("name"); $("#spnAstroName").text(t), $("#btnConnectWithAstro").data("astroid", e), $("#btnConnectWithAstro").data("name", t), $("#btnVerifyOtp").data("name", t), $("#btnVerifyOtp").data("astroid", e) }), $("#resentOtp").on("click", function () { $("#btnLoginSignupOtp").trigger("click") }), $.ajax({ type: "GET", url: "/api/countries", data: {}, headers: { "Content-Type": "application/json", Authorization: `Bearer ${JsSettings.ApiKey}` }, success: function (e) { var t = '<select class="form-control" id="ddlCountries"  name="CountryCode">'; e.isSuccess && $.each(e.data, function (e, a) { "IN" == a.countryCode ? t += '<option  value="' + a.dialCode + '" data-imagecss="flag ' + a.countryCode.toLowerCase() + '" data-image="/images/blank.gif" data-title="(' + a.dialCode + ')" data-label="' + a.dialCode + '" data-dialCode="' + a.dialCode + '" data-countryname="' + a.countryName + '" data-countrycode="' + a.countryCode + '" data-countryId="' + a.countryId + '" data-countrydisplay="' + a.countryName + "(" + a.dialCode + ')" selected>' + a.countryName + "(" + a.dialCode + ")</option>" : t += '<option  value="' + a.dialCode + '" data-imagecss="flag ' + a.countryCode.toLowerCase() + '" data-image="/images/blank.gif" data-title="(' + a.dialCode + ')" data-label="' + a.dialCode + '" data-dialCode="' + a.dialCode + '" data-countryname="' + a.countryName + '" data-countrycode="' + a.countryCode + '" data-countryId="' + a.countryId + '" data-countrydisplay="' + a.countryName + "(" + a.dialCode + ')">' + a.countryName + "(" + a.dialCode + ")</option>" }), t += " </select>", $("#divCountryList").html(t), $("#ddlCountries").msDropdown({ roundedBorder: !1 }) } }), $("#divCountryList").on("change", "#ddlCountries", function () { CountryCode = $(this).val() }), $(".otpInputBox").keyup(function () { var e = parseInt($(this).attr("maxlength")); $(this).val().length >= e && $(this).next(".otpInputBox").focus() }) });