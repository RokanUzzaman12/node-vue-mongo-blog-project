<script>
import { mapActions } from "vuex";
export default {
  name: "signupComponent",
  data() {
    return {
      users: {
        userName: "",
        email: "",
        password: "",
      },
      verificationError: {
        nameError: null,
        emailError: null,
        passwordError: null,
      },
    };
  },
  computed: {},

  methods: {
    ...mapActions("usersModule", ["createUser"]),
    resetInput() {
      this.users.userName = null;
      this.users.email = null;
      this.users.password = null;
    },
    onSubmit() {
      this.createUser(this.users).then((response) => {
        if (response.type === "success") {
          this.$toast.open({
            type: "success",
            message: response.msg,
            duration: 3000,
          });
          this.resetInput();
          this.$router.push({ name: "Login" });
        } else {
          response.data.errors.map((item) => {
            if (item.param == "email") {
              this.verificationError.emailError = item.msg;
            }
            if (item.param == "userName") {
              this.verificationError.nameError = item.msg;
            }
            if (item.param == "password") {
              this.verificationError.passwordError = item.msg;
            }
          });
        }
      });
    },
  },
};
</script>
<template>
  <div>
    <!-- Signup Component Start -->
    <div class="wrapper">
      <div class="logo">
        <img
          src="https://w7.pngwing.com/pngs/286/412/png-transparent-facebook-scalable-graphics-icon-facebook-logo-facebook-logo-blue-logo-electric-blue.png"
          alt=""
        />
      </div>
      <div class="text-center mt-4 name">Facebook</div>
      <form class="p-3 mt-3" @submit.prevent="onSubmit">
        <div class="form-field d-flex align-items-center">
          <input
            v-model="users.userName"
            type="text"
            name="userName"
            id="username"
            placeholder="User Name"
          />
        </div>
        <small v-if="verificationError.nameError" class="text-danger">{{
          verificationError.nameError
        }}</small>
        <div class="form-field d-flex align-items-center">
          <input
            v-model="users.email"
            type="text"
            name="email"
            id="email"
            placeholder="E-mail"
          />
        </div>

        <small v-if="verificationError.emailError" class="text-danger">{{
          verificationError.emailError
        }}</small>

        <div class="form-field d-flex align-items-center">
          <input
            v-model="users.password"
            type="password"
            name="password"
            id="pwd"
            placeholder="Password"
          />
        </div>
        <small v-if="verificationError.passwordError" class="text-danger">{{
          verificationError.passwordError
        }}</small>
        <button class="btn mt-3" type="submit">Sign Up</button>
      </form>
      <div class="text-center fs-6">
        <a href="#">Forget password?</a> or
        <router-link :to="{ name: 'Login' }"> Log in </router-link>
      </div>
    </div>

    <!-- Signup component end -->

    <!-- Main content -->
    <section class="content">
      <div class="container-fluid">
        <div class="row justify-content-center">
          <div class="col-md-6">
            <div class="card">
              <div class="card-body">
                <form @submit.prevent="onSubmit" enctype="multipart/form-data">
                  <div class="form-group">
                    <label>Username</label>
                    <input
                      v-model="users.userName"
                      type="text"
                      class="form-control"
                      placeholder="Username"
                    />
                  </div>
                  <div class="form-group">
                    <label>E-mail</label>
                    <input
                      v-model="users.email"
                      type="text"
                      class="form-control"
                      placeholder="email"
                    />
                  </div>
                  <div class="form-group">
                    <label>Password</label>
                    <input
                      v-model="users.password"
                      type="text"
                      class="form-control"
                      placeholder="Password"
                    />
                  </div>
                  <button type="submit" class="btn btn-primary float-right">
                    Submit
                  </button>
                </form>
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

<style scoped>
/* Importing fonts from Google */
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap");

/* Reseting */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Poppins", sans-serif;
}

body {
  background: #ecf0f3;
}

.wrapper {
  max-width: 500px;
  min-height: 500px;
  margin: 80px auto;
  padding: 40px 30px 30px 30px;
  background-color: #ecf0f3;
  border-radius: 15px;
  box-shadow: 13px 13px 20px #cbced1, -13px -13px 20px #fff;
}

.logo {
  width: 80px;
  margin: auto;
}

.logo img {
  width: 100%;
  height: 80px;
  object-fit: cover;
  border-radius: 50%;
  box-shadow: 0px 0px 3px #5f5f5f, 0px 0px 0px 5px #ecf0f3, 8px 8px 15px #a7aaa7,
    -8px -8px 15px #fff;
}

.wrapper .name {
  font-weight: 600;
  font-size: 1.4rem;
  letter-spacing: 1.3px;
  padding-left: 10px;
  color: #555;
}

.wrapper .form-field input {
  width: 100%;
  display: block;
  border: none;
  outline: none;
  background: none;
  font-size: 1.2rem;
  color: #666;
  padding: 10px 15px 10px 10px;
  /* border: 1px solid red; */
}

.wrapper .form-field {
  padding-left: 10px;
  margin-bottom: 20px;
  border-radius: 20px;
  box-shadow: inset 8px 8px 8px #cbced1, inset -8px -8px 8px #fff;
}

.wrapper .form-field .fas {
  color: #555;
}

.wrapper .btn {
  box-shadow: none;
  width: 100%;
  height: 40px;
  background-color: #03a9f4;
  color: #fff;
  border-radius: 25px;
  box-shadow: 3px 3px 3px #b1b1b1, -3px -3px 3px #fff;
  letter-spacing: 1.3px;
}

.wrapper .btn:hover {
  background-color: #039be5;
}

.wrapper a {
  text-decoration: none;
  font-size: 0.8rem;
  color: #03a9f4;
}

.wrapper a:hover {
  color: #039be5;
}

@media (max-width: 380px) {
  .wrapper {
    margin: 30px 20px;
    padding: 40px 15px 15px 15px;
  }
}

.ql-editor {
  min-height: 200px;
}
</style>
