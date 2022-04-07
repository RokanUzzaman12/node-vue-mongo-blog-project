<script>
import { VueEditor } from "vue3-editor";
export default {
  name: "createPost",
  components: { VueEditor },

  data() {
    return {
      content: "",
      post: {
        title: "",
        content: "",
        image: "",
      },
    };
  },
  methods: {
    onSubmit() {
      console.log(this.post.content);
    },
  },
};
</script>
<template>
  <div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <div class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1 class="m-0">Create Post</h1>
          </div>
          <!-- /.col -->
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">
              <li class="breadcrumb-item"><a href="#">Home</a></li>
              <li class="breadcrumb-item active">Create Post</li>
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
                <form @submit.prevent="onSubmit" enctype="multipart/form-data">
                  <div class="form-group">
                    <label for="exampleInputEmail1">Post Title</label>
                    <input
                      v-model="post.title"
                      type="text"
                      class="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      placeholder="Post Title"
                    />
                  </div>

                  <div class="form-group">
                    <label for="exampleInputEmail1">Post Content</label>
                    <vue-editor v-model="post.content" />
                  </div>

                  <div class="form-group">
                    <label for="exampleInputEmail1">Thumbnail Image</label>
                    <input
                      name="image"
                      type="file"
                      class="form-control-file"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      placeholder="Post Title"
                    />
                  </div>
                </form>
              </div>
              <div class="card-footer">
                <button type="submit" class="btn btn-primary float-right">
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- /.container-fluid -->
    </section>
    <!-- /.content -->
  </div>
</template>
<style>
.ql-editor {
  min-height: 200px;
}
</style>
