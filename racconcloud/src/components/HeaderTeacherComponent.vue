<template>
    <header class="header-container">
      <!-- Mostrar elementos en /dashboard-teacher -->
      <div class="header-user" v-if="$route.name === 'dashboard-teacher'">
        <img src="../assets/icons/avatar-teacher.png" alt="">
        <div class="header-dashboard-user-text">
          <p>Bienvenido</p>
          <p>Usuario</p>
        </div> 
      </div>
      <div class="header-search" v-if="$route.name === 'dashboard-teacher'">
        <img src="../assets/images/busqueda.png" alt="">
        <input type="search" value="Buscar">
      </div>
      <div class="header-img" v-if="$route.name === 'dashboard-teacher'">
        <p>RaccoonCloud</p>
        <img src="../assets/icons/avatar-teacher.png" alt="">
      </div>
  
      <!-- Mostrar elementos en /folders-teacher -->
      <div class="header-folders-title" id="header-folders-title-a" v-if="$route.name === 'folders-teacher-personal'"><p>Personal</p></div>
      <div class="header-folders-title" id="header-folders-title-b" v-if="$route.name === 'folders-teacher-personal'"><p>Materias</p></div>
      <div class="header-user-2" v-if="$route.name === 'folders-teacher-personal'">
        <img src="../assets/icons/avatar-teacher.png" alt="">
        <div class="header-dashboard-user-text">
          <p>Bienvenido</p>
          <p>Usuario</p>
        </div> 
      </div>
      <div class="header-search-2" v-if="$route.name === 'folders-teacher-personal'">
        <img src="../assets/images/busqueda.png" alt="">
        <input 
            type="search" 
            placeholder="Buscar"
            @input="$emit('search-query', $event.target.value)">
      </div>
      <div class="header-img-2" v-if="$route.name === 'folders-teacher-personal'">
        <p>RaccoonCloud</p>
        <img src="../assets/icons/avatar-teacher.png" alt="">
      </div>

      <div class="header-folders-title" id="header-folders-title-a" v-if="$route.name === 'folders-teacher-subjects'"><p>Personal</p></div>
      <div class="header-folders-title" id="header-folders-title-b" v-if="$route.name === 'folders-teacher-subjects'"><p>Materias</p></div>
      <div class="header-user-2" v-if="$route.name === 'folders-teacher-subjects'">
        <img src="../assets/icons/avatar-teacher.png" alt="">
        <div class="header-dashboard-user-text">
          <p>Bienvenido</p>
          <p>Usuario</p>
        </div> 
      </div>
      <div class="header-search-2" v-if="$route.name === 'folders-teacher-subjects'">
        <img src="../assets/images/busqueda.png" alt="">
        <input type="search" value="Buscar">
      </div>
      <div class="header-img-2" v-if="$route.name === 'folders-teacher-subjects'">
        <p>RaccoonCloud</p>
        <img src="../assets/icons/avatar-teacher.png" alt="">
      </div>
  
      <!-- Mostrar elementos en /info-teacher -->
      <div class="header-info-logo" v-if="$route.name === 'info-teacher'">
        <p>Raccon Cloud</p>
      </div>
      <div class="header-user-2" v-if="$route.name === 'info-teacher'">
        <img src="../assets/icons/avatar-teacher.png" alt="">
        <div class="header-dashboard-user-text">
          <p>Bienvenido</p>
          <p>Usuario</p>
        </div> 
      </div>
      <div class="header-search-2" v-if="$route.name === 'info-teacher'">
        <img src="../assets/images/busqueda.png" alt="">
        <input type="search" value="Buscar">
      </div>
      <div class="header-img-2" v-if="$route.name === 'info-teacher'">
        <p>RaccoonCloud</p>
        <img src="../assets/icons/avatar-teacher.png" alt="">
      </div>
    </header>
  </template>
  