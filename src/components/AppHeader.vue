<template>
    <nav class="navbar navbar-light">
        <div>
            <div class="container">
                <a class="navbar-brand" href="/">Conduit</a>
                <ul v-if="isLogin" class="nav navbar-nav pull-xs-right">
                    <li class="nav-item">
                        <RouterLink class="nav-link" exact active-class="active" to="/">
                            Home
                        </RouterLink>
                    </li>

                    <li class="nav-item">
                        <RouterLink class="nav-link" active-class="active" to="/editor">
                            <i class="ion-compose"></i>
                            &nbsp;New Article
                        </RouterLink>
                    </li>
                    <li class="nav-item">
                        <RouterLink class="nav-link" active-class="active" to="/">
                            <i class="ion-gear-a"></i>
                            &nbsp;Settings
                        </RouterLink>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/settings"> <i class="ion-gear-a"></i>&nbsp;Settings </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/profile/eric-simons">
                            <img src="" class="user-pic" />
                            Eric Simons
                        </a>
                    </li>
                </ul>
                <ul v-else class="nav navbar-nav pull-xs-right">
                    <li class="nav-item">
                        <RouterLink class="nav-link" exact active-class="active" to="/">Home
                        </RouterLink>
                    </li>
                    <li class="nav-item">
                        <RouterLink class="nav-link " active-class="active" to="/login">Sign in
                        </RouterLink>
                    </li>
                    <li class="nav-item">
                        <RouterLink class="nav-link" active-class="active" to="/register">Sign up
                        </RouterLink>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
    <noscript>
        <div>
            we are sorry but vue3-realworld-app doesn't work properly without JavaScript enabled.
        </div>
    </noscript>
</template>
    
<script setup lang='ts'>
let isLogin: boolean = true;
</script>
    
<style></style>