<template>
    <div class="auth-page">
        <div class="container page">
            <div class="row">
                <div class="col-md-6 offset-md-3 col-xs-12">
                    <h1 class="text-xs-center">Sign in</h1>
                    <p class="text-xs-center">
                        <RouterLink to="/register">Need an account?</RouterLink>
                    </p>
                    <ul class="error-messages">
                        <li>email or password is invalid</li>
                    </ul>
                    <form>
                        <fieldset class="form-group">
                            <input class="form-control form-control-lg" type="text" placeholder="Email">
                        </fieldset>
                        <fieldset class="form-group">
                            <input class="form-control form-control-lg " type="password" placeholder="Password">
                        </fieldset>
                        <button class="btn btn-lg btn-primary pull-xs-right">Sign in</button>
                    </form>
                </div>
            </div>

        </div>
    </div>
</template>
    
<script setup lang='ts'>

</script>
    
<style></style>