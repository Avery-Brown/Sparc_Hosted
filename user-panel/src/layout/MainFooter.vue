<template>
  <!-- <footer
    class="footer"
    :class="{ [`footer-${type}`]: type }"
    :data-background-color="backgroundColor"
  > -->
    <div class="container" style="margin-bottom: 40px; margin-top: 80px;">
      <!-- <nav>
        <ul>
          <li>
            <a href="https://www.creative-tim.com">
              Creative Tim
            </a>
          </li>
          <li>
            <a href="https:///presentation.creative-tim.com">
              About Us
            </a>
          </li>
          <li>
            <a href="https:///blog.creative-tim.com">
              Blog
            </a>
          </li>
        </ul>
      </nav> -->
          <router-link class="link footer-link pull-left" to="/meet-team" style= "color: #00487c; text-decoration: none; font-size: 14px;">
              Meet the Team&nbsp;&nbsp;&nbsp;|
          </router-link>
          <a class = "social-link" style = "color: #00487c" href="https://www.facebook.com/SparcTheWorld/" target="_blank"><i class="fab fa-facebook fa-lg"/></a>
          <a class = "social-link" style = "color: #00487c" href="https://www.instagram.com/SparcTheWorld/" target="_blank"><i class="fab fa-instagram fa-lg"/></a>
          <a class = "social-link" style = "color: #00487c" href="https://linkedin.com/company/SparcTheWorld" target="_blank"><i class="fab fa-linkedin fa-lg"/></a>
          <a class = "social-link" style = "color: #00487c" href="https://twitter.com/SparcTheWorld/" target="_blank"><i class="fab fa-twitter fa-lg"/></a>
          <a class = "social-link" style = "color: #00487c" href="https://www.youtube.com/channel/UCJldpwGu1lritWkFXbQBGMg" target="_blank"><i class="fab fa-youtube fa-lg"/></a>
        <!-- &copy; {{ year }}, Designed by -->
        <!-- <a href="https:///www.invisionapp.com" target="_blank" rel="noopener"
          >Invision</a
        >. Coded by
        <a href="https://binarcode.com" target="_blank" rel="noopener"
          >BinarCode</a
        >
        and
        <a href="https://www.creative-tim.com" target="_blank" rel="noopener"
          >Creative Tim</a
        >. -->
    </div>
  <!-- </footer> -->
</template>
<script>
export default {
  props: {
    backgroundColor: String,
    type: String
  },
  data() {
    return {
      year: new Date().getFullYear()
    };
  }
};
</script>
<style>
.social-link {
    margin-left: 10px;
    margin-right: 10px;
  }
</style>
