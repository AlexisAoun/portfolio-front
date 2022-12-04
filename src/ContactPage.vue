<template>
  <div class="contact">
    <div class="returnBtn" @click="returnToHomePage">
      <div class="arrow">&lt;</div>
      <div class="label">Revenir à la page d'accueil</div>
    </div>
    <div class="contactContainer">
      <h2>Me contacter</h2>
      <p>
        Mail :
        <a href="mailto:alexisaoun@protonmail.com">alexisaoun@protonmail.com</a>
      </p>
      <p>Tel : +33 6 59 08 83 43</p>
      <div class="socialLogo">
        <a href="https://github.com/AlexisAoun" target="_blank">
          <font-awesome-icon :icon="['fab', 'github']"></font-awesome-icon>
        </a>
        <a
          href="https://www.linkedin.com/in/alexis-aoun-56601020b/"
          target="_blank"
        >
          <font-awesome-icon :icon="['fab', 'linkedin']"></font-awesome-icon>
        </a>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ContactPage',
  methods: {
    returnToHomePage() {
      this.$router.push({
        name: 'Home',
      })
    },
  },
}
</script>
<style>
.contact {
  background-color: #a6a6a6;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.returnBtn {
  display: flex;
  position: absolute;
  top: 2rem;
  left: 2rem;
  align-items: center;
  cursor: pointer;
}

.returnBtn :hover {
  text-decoration: underline;
}

.arrow {
  margin-right: 0.8rem;
  font-size: 1.5rem;
  text-decoration: none !important;
}

.contactContainer {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: whitesmoke;
  border: solid 0.5px whitesmoke;
  border-radius: 1rem;
  padding: 1rem;
  box-shadow: rgba(0, 0, 0, 0.08) 0px 4px 12px;
}

.contactContainer p {
  font-size: 1.5rem;
  text-align: center;
}

.contactContainer a {
  color: gray;
}

.contactContainer h2 {
  font-size: 2rem;
  text-align: center;
}

.socialLogo {
  display: flex;
  justify-content: space-evenly;
  width: 10rem;
  font-size: 2rem;
}

.socialLogo a {
  color: black;
}

@media screen and (max-width: 1270px) {
  .contactContainer {
    width: 80%;
  }

  .contactContainer p {
    font-size: 1.2rem;
  }

  .socialLogo {
    width: 15rem;
  }

}

@media screen and (max-height: 700px) and (max-width: 300px) {
  .contactContainer p {
    font-size: 1rem;
  }
  
  .returnBtn {
    font-size: 0.8rem;
  }
}
</style>
