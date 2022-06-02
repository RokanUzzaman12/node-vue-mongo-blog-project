<script>
import { mapActions, mapGetters } from "vuex";
import NavbarLayout from "../layout/navbar";
import SidebarLayout from "../layout/sidebar";

import FooterLayout from "../layout/footer";
export default {
  name: "manageUsers",
  components: { NavbarLayout, SidebarLayout, FooterLayout },
  data() {
    return {};
  },
  computed: {
    ...mapGetters("usersModule", ["getAllUsers"]),
  },
  methods: {
    ...mapActions("usersModule", ["fetchAllUsers"]),

    myFunction() {
      // Declare variables
      var input, filter, table, tr, td, i, txtValue;
      input = document.getElementById("searchInput");
      filter = input.value.toUpperCase();
      table = document.getElementById("usersTable");
      tr = table.getElementsByTagName("tr");

      // Loop through all table rows, and hide those who don't match the search query
      for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[0];
        if (td) {
          txtValue = td.textContent || td.innerText;
          if (txtValue.toUpperCase().indexOf(filter) > -1) {
            tr[i].style.display = "";
          } else {
            tr[i].style.display = "none";
          }
        }
      }
    },
  },
  created() {
    console.log("good to go");
    this.fetchAllUsers();
  },
};
</script>
<template>
  <NavbarLayout />
  <SidebarLayout />
  <div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <div class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1 class="m-0">Manage User</h1>
          </div>
          <!-- /.col -->
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">
              <li class="breadcrumb-item"><a href="#">Home</a></li>
              <li class="breadcrumb-item active">Manage User</li>
            </ol>
          </div>
          <!-- /.col -->
        </div>
        <!-- /.row -->
      </div>
      <!-- /.container-fluid -->
    </div>
    <!-- /.content-header -->

    <!-- Main content -->
    <section class="content">
      <div class="container-fluid">
        <div class="row">
          <div class="col-md-12">
            <div class="card">
              <div class="card-body">
                <div class="row">
                  <div class="col-md-4">
                    <div class="input-group mb-2">
                      <input
                        @keyup="myFunction"
                        type="search"
                        id="searchInput"
                        class="form-control rounded"
                        placeholder="Search"
                        aria-label="Search"
                        aria-describedby="search-addon"
                      />
                      <button type="button" class="btn btn-outline-primary">
                        search
                      </button>
                    </div>
                  </div>
                </div>
                <div class="table-responsive">
                  <table class="table table-striped" id="usersTable">
                    <thead>
                      <tr>
                        <th>User Name</th>
                        <th>E-Mail</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="item in getAllUsers" :key="item._id">
                        <td>{{ item.userName }}</td>
                        <td>{{ item.email }}</td>
                        <td>action</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- /.container-fluid -->
    </section>
    <!-- /.content -->
  </div>
  <FooterLayout />
</template>
<style>
.ql-editor {
  min-height: 200px;
}
</style>
