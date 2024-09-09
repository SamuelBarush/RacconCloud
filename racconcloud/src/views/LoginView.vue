<template>
    <HeaderLoginComponent/>
    <main class="main-login-container">
        <form action="" method="post">
            <div class="main-login-ID">
                <label for="">Identificación</label>
                <div><input type="text" value="Ingresa tu ID" name="" id=""></div>
            </div>
            <div class="main-login-PW">
                <label for="">Contraseña</label>
                <div><input type="text" value="Ingresa tu Contraseña" name="" id=""></div>
                <p id="main-login-FPW">Olvide mi Contraseña</p>
            </div>   
            <div class="main-login-BT"><input type="button" value="Sign Up"></div>
        </form>
    </main>
</template>

<script setup>
    import HeaderLoginComponent from '../components/HeaderLoginComponent.vue'
</script>
