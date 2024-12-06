<template>
    <HeaderAcademyComponent/>
    <main class="main-dashboard-container">
        <MenuDashboardAcademy 
            @openCreateFolder="showModal1 = true" 
            @openUploadFile="showModal2 = true"
            @openCreateSubject="showModal3 = true"
            @openAddStudent="showModal4 = true"
            @openAddTeacher="showModal5 = true"/>
        <div class="main-dashboard-principal">
            <div class="main-dashboard-title">
                <p>Mis Carpetas</p>
            </div>
            <div class="main-container-grid-a">
                <div class="main-dashboard-block">
                    <div class="main-dashboard-block-img">
                        <img src="../assets/images/usuario.png" alt="">
                        <p>Carpeta Personal</p>
                    </div>
                    <p>{{ used_space }} Mb de {{ total_space }} Mb <br> Espacio Disponible {{ free_space }} Mb</p>
                </div>
            </div>
            <div class="main-dashboard-title">
            <p>Subidos Recientemente</p>
            <div class="main-dashboard-title-description">
                <p>Nombre</p>
                <p>Fecha de Subida</p>
                <p>Tamaño</p>
            </div>
            </div>
            <div class="main-container-grid-b">
                <div
                    v-for="(file, index) in recentFiles"
                    :key="index"
                    class="main-dashboard-block-b"
                >
                <div class="main-folders-block-b-img">
                <svg class="folder-svg-img" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                    width="100%" viewBox="0 0 512 512" enable-background="new 0 0 512 512" xml:space="preserve">
                <path fill="#FFFFFF" opacity="1.000000" stroke="none" 
                    d="
                M384.000000,513.000000 
                    C299.645782,513.000000 215.291550,513.000000 130.767715,512.650391 
                    C128.662720,511.656830 126.758728,510.889374 124.787109,510.387787 
                    C101.416656,504.442749 82.022148,492.390625 66.878036,473.451263 
                    C51.707989,454.479401 43.236992,432.845581 43.148598,408.732971 
                    C42.790703,311.104309 42.948788,213.473511 43.086842,115.843735 
                    C43.099327,107.016228 44.018875,98.153381 45.060825,89.371445 
                    C47.352188,70.059036 55.938290,53.217342 68.171051,38.661034 
                    C83.939308,19.897682 104.041306,7.478417 128.528854,2.919382 
                    C129.117935,2.809709 129.513947,1.663013 130.000000,1.000001 
                    C176.687561,1.000000 223.375122,1.000000 270.231110,1.357036 
                    C272.229950,2.150220 274.057159,2.600323 275.891266,3.020437 
                    C304.815338,9.645732 330.588074,22.265980 351.803314,43.339348 
                    C375.434875,66.812897 398.841400,90.513252 422.510864,113.948288 
                    C437.425110,128.714798 449.743378,145.116211 458.270264,164.475906 
                    C466.151367,182.369415 470.691711,201.030334 470.831757,220.349609 
                    C471.283203,282.633636 471.064545,344.923157 470.910126,407.210083 
                    C470.892792,414.202362 470.336884,421.347900 468.818542,428.151886 
                    C464.801361,446.154327 457.056274,462.614929 444.836975,476.492798 
                    C428.970184,494.513367 409.426544,506.683044 385.469727,511.080933 
                    C384.882141,511.188812 384.485596,512.336975 384.000000,513.000000 
                M427.000000,235.500916 
                    C426.999969,230.502579 426.877014,225.500259 427.038208,220.507126 
                    C427.170898,216.395950 425.753815,214.872849 421.337891,214.898697 
                    C389.179626,215.086975 357.019135,215.105743 324.860962,214.909531 
                    C318.537872,214.870941 312.128998,214.138977 305.918823,212.917679 
                    C279.386292,207.699814 256.386871,180.748718 256.864258,152.491623 
                    C257.438354,118.509048 257.000000,84.509369 257.000000,50.517101 
                    C257.000000,48.733856 257.000000,46.950611 257.000000,44.000000 
                    C242.583496,44.000000 228.688339,44.000000 214.793182,44.000000 
                    C194.964355,44.000000 175.135040,44.087688 155.306870,43.972576 
                    C139.111603,43.878559 124.311699,47.607296 111.336571,57.908661 
                    C96.328300,69.824211 87.317017,85.365784 87.226707,104.183052 
                    C86.745338,204.491257 86.988770,304.803009 87.042107,405.113495 
                    C87.044189,409.021698 87.398170,412.973907 88.039566,416.830536 
                    C93.236519,448.079163 119.196373,469.595306 149.601334,469.829956 
                    C219.248001,470.367462 288.901794,469.928009 358.552368,470.060669 
                    C372.497589,470.087219 385.625763,467.494812 397.403809,459.888641 
                    C415.675751,448.088776 426.502441,431.064789 426.763214,409.458344 
                    C427.458954,351.813202 427.000000,294.154114 427.000000,235.500916 
                M342.000000,95.500000 
                    C328.925079,82.772125 317.025024,68.650925 300.000610,59.486153 
                    C300.000610,90.740494 299.573181,121.188873 300.232544,151.613708 
                    C300.463226,162.258392 309.234009,170.998917 320.613617,170.999496 
                    C349.243744,171.000961 377.873901,171.000000 406.504028,171.000000 
                    C407.930786,171.000000 409.357544,171.000000 410.784271,171.000000 
                    C411.137299,170.568604 411.490326,170.137192 411.843353,169.705795 
                    C406.265259,162.675613 401.217804,155.131958 395.007477,148.713516 
                    C377.763763,130.891922 360.036346,113.538422 342.000000,95.500000 
                z"/>
                <path fill="#FFFFFF" opacity="1.000000" stroke="none" 
                    d="
                M341.830933,278.000000 
                    C351.835114,277.835114 358.457947,282.399353 362.300262,290.860718 
                    C366.278351,299.621155 364.168121,307.951599 358.320709,314.856812 
                    C355.093872,318.667389 350.358765,321.088562 344.616516,321.076263 
                    C286.301147,320.951385 227.985443,321.017212 169.669876,320.981384 
                    C160.914719,320.976013 155.327286,316.283051 151.898911,308.504852 
                    C148.374130,300.507965 149.181137,292.925598 154.458099,286.123444 
                    C158.899567,280.398254 164.924957,277.900757 172.405777,277.920197 
                    C228.721664,278.066559 285.038086,278.000000 341.830933,278.000000 
                z"/>
                <path fill="#FFFFFF" opacity="1.000000" stroke="none" 
                    d="
                M300.000000,384.998047 
                    C300.513519,397.510803 290.756897,406.734497 278.957153,406.860596 
                    C243.005005,407.244873 207.041122,407.337677 171.092697,406.806915 
                    C159.370651,406.633789 151.798782,399.738373 150.143661,388.975159 
                    C148.099564,375.682678 155.470093,366.083374 166.897583,363.989166 
                    C169.112076,363.583313 171.353256,363.045776 173.582962,363.041931 
                    C208.373886,362.982056 243.165375,362.899750 277.955719,363.053101 
                    C290.531616,363.108521 300.659210,372.746979 300.000000,384.998047 
                z"/>
                </svg>
                <p>{{ file.path.split('/').pop() }}</p>
                </div>
                <div class="main-folders-block-b-txt">
                <p>{{ file.date.toLocaleDateString() }}</p> <!-- Fecha del archivo -->
                </div>
                <div class="main-folders-block-b-txt">
                <p>{{ file.size }} KB</p> <!-- Tamaño del archivo -->
                </div>
            </div>
            </div>
        </div>  
    </main>
    <ThemeSwitcherComponent/>
    <FooterAcademyComponent/>
    <SubjectRegisterComponent v-if="showModal3" @close="showModal3 = false"/>
    <AddStudentComponent v-if="showModal4" @close="showModal4 = false"/>
    <AddTeacherComponent v-if="showModal5" @close="showModal5 = false"/>
    <ModalFolderCreate v-if="showModal1" @close-Modal1="showModal1 = false"/>
    <ModalFileUpload v-if="showModal2" @close-Modal2="showModal2 = false"/>
    <div v-if="showModal1 || showModal2 || showModal3 || showModal4 || showModal5" class="overlay"></div>
</template>

<script setup>
    import HeaderAcademyComponent from '@/components/HeaderAcademyComponent.vue'
    import FooterAcademyComponent from '@/components/FooterAcademyComponent.vue'
    import MenuDashboardAcademy from '@/components/MenuDashboardAcademy.vue'
    import ModalFileUpload from '@/components/ModalFileUpload.vue'
    import ModalFolderCreate from '@/components/ModalFolderCreate.vue'
    import ThemeSwitcherComponent from '@/components/ThemeSwitcherComponent.vue'
    import AddStudentComponent from '@/components/AddStudentComponent.vue'
    import AddTeacherComponent from '@/components/AddTeacherComponent.vue'
    import SubjectRegisterComponent from "@/components/SubjectRegisterComponent.vue"

    import { ref, computed, onMounted } from 'vue'
    import { useFileStore } from '@/store/FileStore'

    const showModal1 = ref(false)
    const showModal2 = ref(false)
    const showModal3 = ref(false)
    const showModal4 = ref(false)
    const showModal5 = ref(false)

    const fileStore = useFileStore()

    const total_space = ref('')
    const free_space = ref('')
    const used_space = ref('')
    
    // Obtener los archivos más recientes
    const recentFiles = computed(() => fileStore.getRecentFiles())
    
    // Cargar los archivos al montar el componente
    onMounted(async () => {
        await fileStore.getFiles()
        const containerInfo = await fileStore.getSize()
        if (containerInfo) {
        total_space.value = containerInfo.total_space
        free_space.value = containerInfo.free_space
        used_space.value = containerInfo.used_space
        }
    })
</script>

<style lang="scss">
    .overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        pointer-events: all;
        z-index: 999;
    }
</style>

