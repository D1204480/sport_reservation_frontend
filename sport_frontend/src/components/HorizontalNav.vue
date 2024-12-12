<template>

    <div class="container-fluid fs-6">
        <ul class="nav nav-tabs">
            <li class="nav-item">
                <RouterLink to="/" class="nav-link link-success active" >首頁</RouterLink>
            </li>
            <li class="nav-item">
                <RouterLink to="/about" class="nav-link link-success" aria-current="page">樓層介紹</RouterLink>
            </li>
            <li class="nav-item">
                <RouterLink class="nav-link link-success " >場地預約</RouterLink>
            </li>
            <li class="nav-item">
                <RouterLink class="nav-link link-success" >交通資訊</RouterLink>
            </li>
            <li class="nav-item">
                <RouterLink class="nav-link link-success" >無障礙設施</RouterLink>
            </li>
        </ul>
    </div>

</template>

<script>
import { RouterLink } from 'vue-router';
</script>

<style>
.nav-item {
    font-size: 18px;
}

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
        font-size: 15px;
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