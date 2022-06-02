<script>
import NavbarLayout from "./layout/navbar";
import SidebarLayout from "./layout/sidebar";
import DefaultLayout from "./layout/default";
import FooterLayout from "./layout/footer";
export default {
  name: "mainLayout",
  components: { NavbarLayout, SidebarLayout, DefaultLayout, FooterLayout },
};
</script>

<template>
  <div class="wrapper">
    <!-- Navbar -->
    <NavbarLayout />
    <!-- /.navbar -->

    <!-- Main Sidebar Container -->
    <SidebarLayout />
    <!-- Content Wrapper. Contains page content -->
    <DefaultLayout />

    <!-- <router-view :to="{ name: 'Default' }"></router-view> -->

    <!-- <router-view :to="testComponent"></router-view> -->
    <!-- <DefaultLayout /> -->
    <!-- /.content-wrapper -->
    <FooterLayout />
    <!-- /.control-sidebar -->
  </div>
</template>
