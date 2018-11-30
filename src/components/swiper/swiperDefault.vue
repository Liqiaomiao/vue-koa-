<template>
    <div>
        <swiper class="swiper"  :options="swiperOption">
            <swiper-slide class="swiper-slide" v-for="(item,index) in slide" :key="index">
                Slide{{item}}
            </swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
        </swiper>

    </div>
</template>

<script>
    import {swiper, swiperSlide} from 'vue-awesome-swiper'
    export default {
        name: 'swiperDefault',
        components: {
            swiperSlide,
            swiper,
        },
        data(){
            return {
                slide: [1, 2, 3, 4, 5, 6],
                swiperOption: {
                    direction: 'vertical',
                    loop: true,
                    pagination: {
                        el: '.swiper-pagination',
                        clickable: true,
                    }
                },
            }
        }
    }
</script>

<style scoped>
    .swiper-slide {
        height: 64px;
        text-align: center;
        padding-top: 4.8px;
        border-bottom: 1px solid #ccc;
        box-sizing: border-box;
    }
    .swiper{
        height: 112px;
        border-top:1px solid #ccc;
        border-bottom:1px solid #ccc;
    }
</style>