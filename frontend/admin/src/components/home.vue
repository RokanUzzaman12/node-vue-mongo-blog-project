<script>
import NavbarLayout from "./layout/navbar";
import SidebarLayout from "./layout/sidebar";
export default {
  name: "HomeLayout",
  components: { NavbarLayout, SidebarLayout },
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
    <router-view :to="Default"></router-view>
    <!-- <router-view :to="testComponent"></router-view> -->
    <!-- <DefaultLayout /> -->
    <!-- /.content-wrapper -->
    <footer class="main-footer">
      <strong
        >Copyright &copy; 2014-2021
        <a href="https://adminlte.io">AdminLTE.io</a>.</strong
      >
      All rights reserved.
      <div class="float-right d-none d-sm-inline-block">
        <b>Version</b> 3.2.0
      </div>
    </footer>

    <!-- Control Sidebar -->
    <aside class="control-sidebar control-sidebar-dark">
      <!-- Control sidebar content goes here -->
    </aside>
    <!-- /.control-sidebar -->
  </div>
</template>
