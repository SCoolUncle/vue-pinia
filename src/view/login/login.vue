<template>
    <div class="flex items-center justify-center login_page_container" :style="{background:` url(${loginBg}) no-repeat center/cover` }">
        <div 
            class="p-8 rounded-md hover:shadow-xl login_box"
            hoverable
            :bordered="false"
        >
            <div class="login_logo">
                <!-- <img :src="logo" alt=""> -->
            </div>
            <div class="flex justify-between top_tab">
                <a href="javascript:void()" style="font-size: 1rem;">登录</a>
                <span>|</span>
                <a href="javascript:void()">注册</a>
            </div>   
            <Form>
                <FormItem>
                    <Input>
                    </Input>
                </FormItem>
            </Form>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { Form} from 'ant-design-vue'
    import loginBg from '/@/assets/background/loginPage/loginbg.jpg'
    
</script>

<style lang="less" scoped>
    @media screen and (max-width: 500px){
        .login_page_container{
            padding:20px;
            .login_box{
                width:100%;
                height: 80%;
            }
        }
    }
    @media screen and (min-width: 500px){
         .login_page_container{
            .login_box{
                width:400px;
                height: 60%;
            }
        }
    }
    .login_page_container{
        overflow: hidden;
        position:absolute;
        height: 100%;
        width: 100%;
        .login_box{
            background-color: #ffffff;
        }
    }
   
</style>