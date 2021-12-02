<template>
    <div class="flex items-center justify-center login_page_container" :style="{background:` url(${loginBg}) no-repeat center/cover` }"> 
        <transition name="fade" >
            <LoginForm v-show="isload"></LoginForm> 
        </transition>
    </div>
</template>

<script setup lang="ts">
    import { onMounted, reactive,ref } from 'vue';
    import LoginForm from './components/loginForm.vue';

    import loginBg from '/@/assets/background/loginPage/loginbg.jpg';

    let isload = ref(false);
    const state = reactive({

    });

    onMounted(() => {
        isload.value = true
    })
    
</script>

<style lang="less" >
    @media screen and (max-width: 500px){
        .login_page_container{
            padding:20px;
            .login_box{
                width:100%;
                min-height: 80%;
            }
        }
    }
    @media screen and (min-width: 500px){
         .login_page_container{
            .login_box{
                width:400px;
                // height: 65%;
                min-height: 65%;
            }
        }
    }
    .login_page_container{
        overflow: hidden;
        position:absolute;
        height: 100%;
        width: 100%;
        .login_tab::after{
            content:'';
            position: relative;
            left:calc(50% - 13px);
            display: block;
            height: 4px;
            width:24px;
            background: #F472B6;
            border-radius: 5px;
        }
        .login_box{
            background-color: #ffffff;
        }
        .login_form{
            input::-webkit-input-placeholder {
                color: #C4B5FD; 
            } 
           .ant-input{
               border:none;
               border-radius: 50px;
               line-height: 26px;
               text-align: center;
               color:#6D28D9;
               background-color: #F5F3FF;
               font-weight: 500;
           }            
        }
    }
    .fade-enter-active, .fade-leave-active{
        transition: opacity 3s;                             
    }
    .fade-enter, .fade-leave-to {           
        opacity: 0;
    }
   
</style>