<template>
    <div>
        <swiper class="swiper" :options="swiperOption">
            <swiper-slide class="text">
                <div class="content">
                    背景图懒加载
                    和图片懒加载不同，背景图懒加载需要使用v-lazy:background-image，值设置为背景图片的地址，需要注意的是必须声明容器高度。
                    背景图懒加载
                    和图片懒加载不同，背景图懒加载需要使用v-lazy:background-image，值设置为背景图片的地址，需要注意的是必须声明容器高度。
                    背景图懒加载
                    和图片懒加载不同，背景图懒加载需要使用v-lazy:background-image，值设置为背景图片的地址，需要注意的是必须声明容器高度。
                    背景图懒加载
                    和图片懒加载不同，背景图懒加载需要使用v-lazy:background-image，值设置为背景图片的地址，需要注意的是必须声明容器高度。背景图懒加载
                    和图片懒加载不同，背景图懒加载需要使用v-lazy:background-image，值设置为背景图片的地址，需要注意的是必须声明容器高度。
                    背景图懒加载
                    和图片懒加载不同，背景图懒加载需要使用v-lazy:background-image，值设置为背景图片的地址，需要注意的是必须声明容器高度。背景图懒加载
                    和图片懒加载不同，背景图懒加载需要使用v-lazy:background-image，值设置为背景图片的地址，需要注意的是必须声明容器高度。
                    背景图懒加载
                    和图片懒加载不同，背景图懒加载需要使用v-lazy:background-image，值设置为背景图片的地址，需要注意的是必须声明容器高度。背景图懒加载
                    和图片懒加载不同，背景图懒加载需要使用v-lazy:background-image，值设置为背景图片的地址，需要注意的是必须声明容器高度。背景图懒加载
                    和图片懒加载不同，背景图懒加载需要使用v-lazy:background-image，值设置为背景图片的地址，需要注意的是必须声明容器高度。
                    背景图懒加载
                    和图片懒加载不同，背景图懒加载需要使用v-lazy:background-image，值设置为背景图片的地址，需要注意的是必须声明容器高度。背景图懒加载
                    和图片懒加载不同，背景图懒加载需要使用v-lazy:background-image，值设置为背景图片的地址，需要注意的是必须声明容器高度。背景图懒加载
                    和图片懒加载不同，背景图懒加载需要使用v-lazy:background-image，值设置为背景图片的地址，需要注意的是必须声明容器高度。
                    背景图懒加载
                    和图片懒加载不同，背景图懒加载需要使用v-lazy:background-image，值设置为背景图片的地址，需要注意的是必须声明容器高度。
                    背景图懒加载
                    和图片懒加载不同，背景图懒加载需要使用v-lazy:background-image，值设置为背景图片的地址，需要注意的是必须声明容器高度。
                    背景图懒加载
                    和图片懒加载不同，背景图懒加载需要使用v-lazy:background-image，值设置为背景图片的地址，需要注意的是必须声明容器高度。
                </div>
            </swiper-slide>
        </swiper>

    </div>
</template>

<script>
    import 'swiper/dist/css/swiper.css'
    import {swiper, swiperSlide} from 'vue-awesome-swiper'
    export default {
        name: 'swiperText',
        components:{
            swiper,
            swiperSlide
        },
        data(){
            return {
                swiperOption: {
                    direction: 'vertical',
                    slidesPerView: 'auto',
                    freeMode: true,
                    mousewheel: true
                }
            }
        },
    }
</script>

<style scoped>
    .swiper {
        height: 300px;
        overflow: hidden;
    }

    .text {
        font-size: 18px !important;
        text-align: center;
        padding: 30px;
        height: auto;
        box-sizing: border-box;
    }
</style>