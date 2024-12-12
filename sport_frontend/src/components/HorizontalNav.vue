<template>

    <div class="container-fluid fs-6">
        <ul class="nav nav-tabs">
            <li class="nav-item">
                <a class="nav-link link-success active" href="#">首頁</a>
            </li>
            <li class="nav-item">
                <RouterLink to="/AboutView" class="nav-link link-success" aria-current="page">樓層介紹</RouterLink>
            </li>
            <li class="nav-item">
                <a class="nav-link link-success " href="menu.html">場地預約</a>
            </li>
            <li class="nav-item">
                <a class="nav-link link-success" href="#">交通資訊</a>
            </li>
            <li class="nav-item">
                <a class="nav-link link-success" href="#">無障礙設施</a>
            </li>
        </ul>
    </div>

</template>

<script>
import { RouterLink } from 'vue-router';
</script>

<style>
.nav {
    border-bottom: 2px solid #FF7452 !important;
    /* 下方加橘色線條 */

}

.nav-link {
    color: black !important;
    /* 非 active 的狀態 */

}

.nav-link.active {


    color: rgb(255, 255, 255) !important;
    background-color: #FF7452 !important;
    border-top: 2px solid #FF7452 !important;
    border-left: 2px solid #FF7452 !important;
    border-right: 2px solid #FF7452 !important;
    border-bottom: 1px solid #FF7452 !important;



}

.nav-link:hover {
    color: black !important;
    border-top: 2px solid #FF7452 !important;
    border-left: 2px solid #FF7452 !important;
    border-right: 2px solid #FF7452 !important;
    border-bottom: 1px solid #FF7452 !important;
}

@media screen and (max-width: 580px) {

    .nav-item {
        font-size: 14px;
    }

}

@media screen and (max-width: 510px) {

    .nav-item {
        font-size: 13px;
    }

}

@media screen and (max-width: 485px) {

    .nav-item {
        font-size: 10px;
    }

}


@media screen and (max-width: 425px) {
    .nav-item {
        font-size: 9px;
    }
}



/* END */
</style>