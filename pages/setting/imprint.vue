<template>
  <div>
    <div class="row justify-content-center">
      <div class="col-12 col-sm-12 col-md-8 pt-4">
        <h1>Impressum</h1>

        <h2>Angaben gem&auml;&szlig; &sect; 5 TMG</h2>
        <p>
          Robert-Carl Rapp<br>
          Sindlingerstr. 23<br>
          71083 Herrenberg
        </p>

        <h2>Postadresse</h2>
        <p>Sindlingerstr. 23</p>
        <p>71083 Herrenberg</p>

        <h2>Kontakt</h2>
        <p>
          Telefon: +(49)15784037946<br>
          E-Mail: kontakt@mindboost.team
        </p>

        <p>Quelle: <a href="https://www.e-recht24.de/impressum-generator.html">Generated by eRecht24</a></p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SettingPage',
  setup () {
    const { t } = useI18n()
    const localePath = useLocalePath()
    return { t, localePath }
  }
}
</script>

<style>

</style>
