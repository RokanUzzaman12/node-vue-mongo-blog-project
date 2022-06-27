<script>
import { mapActions, mapGetters } from "vuex";
import FooterLayout from "../layout/footer";
import NavbarLayout from "../layout/navbar";
import SidebarLayout from "../layout/sidebar";
export default {
  name: "AllPost",
  components: { NavbarLayout, SidebarLayout, FooterLayout },

  data() {
    return {};
  },
  computed: {
    ...mapGetters("postModule", ["getAllPost"]),
  },
  methods: {
    ...mapActions("postModule", ["createPost", "fetchAllPost"]),
  },
  created() {
    this.fetchAllPost();
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
            <h1 class="m-0">All Post</h1>
          </div>
          <!-- /.col -->
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">
              <li class="breadcrumb-item"><a href="#">Home</a></li>
              <li class="breadcrumb-item active">Manage Post</li>
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
                test

                <div class="table-responsive">
                  <table class="table table-striped" id="usersTable">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Image</th>
                        <th>Author</th>
                        <th>Title</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(item, index) in getAllPost" :key="item._id">
                        <td>{{ index + 1 }}</td>
                        <td>
                          <img
                            :src="
                              'http://localhost:3000/images/' + item.postImage
                            "
                            style="width: 50px"
                          />
                        </td>
                        <td v-if="item.author">{{ item.author.userName }}</td>
                        <td v-if="item.author == null">N/A</td>
                        <td>{{ item.title }}</td>

                        <td class="text-right">
                          <router-link
                            :to="{ name: 'mainLayout' }"
                            class="btn btn-primary mr-2"
                          >
                            <i class="fas fa-eye"></i>
                          </router-link>
                          <button class="btn btn-primary mr-2">
                            <i class="fas fa-edit"></i>
                          </button>
                          <button class="btn btn-danger mr-2">
                            <i class="fas fa-trash"></i>
                          </button>
                        </td>
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
