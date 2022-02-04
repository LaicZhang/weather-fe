<template>
  <div class="container" id="container">
        <div class="form-container sign-up-container">
            <form action="#">
                <h1>注 册</h1>
                <!-- <div class="social-container">
                    <a href="#" class="social"><i class="fab fa-qq"></i></a>
                    <a href="#" class="social"><i class="fab fa-weixin"></i></a>
                    <a href="#" class="social"><i class="fab fa-weibo"></i></a>
					<a href="#" class="social"><i class="fab fa-github"></i></a>
                </div> -->
                <!-- <span>选择以上方式注册您的账号</span> -->
				<input type="text" placeholder="手机号" />
                <input type="text" placeholder="用户名" />
                <input type="email" placeholder="邮箱" />
                <input type="password" placeholder="密码" />
                <button>注册</button>
            </form>
        </div>
        <div class="form-container sign-in-container">
            <form action="#">
                <h1>登 录</h1>
                <!-- <div class="social-container">
                    <a href="#" class="social"><i class="fab fa-qq"></i></a>
                    <a href="#" class="social"><i class="fab fa-weixin"></i></a>
                    <a href="#" class="social"><i class="fab fa-weibo"></i></a>
					<a href="#" class="social"><i class="fab fa-github"></i></a>
                </div>
                <span>选择以上方式登录或使用您的账号</span> -->
                <input type="email" placeholder="邮箱" />
                <input type="password" placeholder="密码" />
                <a href="#">忘记密码？</a>
                <button>登录</button>
            </form>
        </div>
        <div class="overlay-container">
            <div class="overlay">
                <div class="overlay-panel overlay-left">
                    <h1>已有账号？</h1>
                    <p>请使用您的账号进行登录</p>
                    <button class="ghost" id="signIn">登录</button>
                </div>
                <div class="overlay-panel overlay-right">
                    <h1>没有账号？</h1>
                    <p>立即注册加入我们</p>
                    <button class="ghost" id="signUp">注册</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    mounted(){
        const signUpButton = document.getElementById('signUp');
        const signInButton = document.getElementById('signIn');
        const container = document.getElementById('container');

        signUpButton.addEventListener('click', () => container.classList.add('right-panel-active'));
        signInButton.addEventListener('click', () => container.classList.remove('right-panel-active'));

        var demoImg = document.getElementById("demo_img");
        var demoInput = document.getElementById("demo_input");

        //隐藏text block，显示password block
        function hideShowPsw(){
            if (demoInput.type == "password") {
                demoInput.type = "text";
                demo_img.src = "invisible.png";
            }else {
                demoInput.type = "password";
                demo_img.src = "visible.png";
            }
        }

    }
}
</script>

<style scoped>
/* reset */
*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body{
    font-family: Arial, Helvetica, sans-serif;
    background: #f6f5f7;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
}

h1{
    font-weight: bold;
    margin: 0;
}

p{
    font-size: 14px;
    font-weight: 100;
    line-height: 20px;
    letter-spacing: 0.5px;
    margin: 20px 0 30px;
}

span{
    font-size: 12px;
}

a{
    color: #333;
    font-size: 14px;
    text-decoration: none;
    margin: 15px 0;
}

/* container */
.container{
    background: #fff;
    border-radius: 10px;
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
    position: relative;
    overflow: hidden;
    width: 768px;
    max-width: 100%;
    min-height: 480px;
    margin:0 auto;
    margin-top: 100px;
}

.form-container form{
    background-color: #fff;
    display: flex;
    flex-direction: column;
    padding: 0 30px;
    height: 100%;
    justify-content: center;
    align-items: center;
    text-align: center;
}

.social-container{
    margin: 10px 0;
}

.social-container a{
    border: 1px solid #ddd;
    border-radius: 50%;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    margin: 0 5px;
    height: 40px;
    width: 40px;
}

.form-container input{
    background: #eee;
    border: none;
    padding: 12px 15px;
    margin: 5px 0;
    width: 100%;
}

button{
	cursor: pointer;
    border-radius: 20px;
    border: 1px solid #ff4b2b;
    background: #ff4b2b;
    color: #fff;
    font-size: 12px;
    font-weight: bold;
    padding: 12px 45px;
    letter-spacing: 1px;
    transition: transform 80ms ease-in;
}

button:active{
    transform: scale(0.95);
}

button:focus{
    outline: none;
}

button.ghost{
    background: transparent;
    border-color: #fff;
}

.form-container{
    position: absolute;
    top: 0;
    height: 100%;
    transition: all 0.6s ease-out;
}

/* sign in */
.sign-in-container{
    left: 0;
    width: 50%;
    z-index: 2;
}

/* sign up */
.sign-up-container{
    left: 0;
    width: 50%;
    opacity: 0;
    z-index: 1;
}

/* overlay-container */
.overlay-container{
    position: absolute;
    top: 0;
    left: 50%;
    width: 50%;
    height: 100%;
    overflow: hidden;
    transition: transform 0.6s ease-in-out;
    z-index: 100;
}

.overlay{
    background: #ff416c;
    background: linear-gradient(to right, #ff4b2b, #ff416c) no-repeat 0 0/cover;
    color: #fff;
    height: 100%;
    width: 200%;
    position: relative;
    left: -100%;
    transform: translateX(0);
    transition: transform 0.6s ease-in-out;
}

.overlay-panel{
    position: absolute;
    top: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 50%;
    padding: 0 40px;
    text-align: center;
    transform: translateX(0);
    transition: transform 0.6s ease-in-out;
}

.overlay-right{
    right: 0;
    transform: translateX(0);
}

.overlay-left{
    transform: translateX(-20%);
}

/* animation */
/* move sign in to the right */
.container.right-panel-active .sign-in-container{
    transform: translateX(100%);
}

/* move overlay to left */
.container.right-panel-active .overlay-container{
    transform: translateX(-100%);
}

/* bring sign up over sign in */
.container.right-panel-active .sign-up-container{
    opacity: 1;
    z-index: 5;
    transform: translateX(100%);
}

/* move overlay back to right */
.container.right-panel-active .overlay{
    transform: translateX(50%);
}
.container.right-panel-active .overlay-left{
    transform: translateX(0);
}
.container.right-panel-active .overlay-right{
    transform: translateX(20%);
}
</style>