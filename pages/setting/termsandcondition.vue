<template>
  <div>
    <div class="row justify-content-center">
      <div class="col-12 col-sm-12 col-md-8 pt-4">
        <h1>Nutzungsbedingungen der App von Mindboost</h1>

        <h2>1. Geltungsbereich</h2>
        <p>Diese Nutzungsbedingungen gelten für alle Dienste und Inhalte, die durch die App von Mindboost bereitgestellt werden. Mit der Registrierung bei oder der Nutzung unserer Dienste erklären Sie sich mit diesen Bedingungen einverstanden.</p>

        <h2>2. Nutzung von Audiodateien</h2>
        <p>Die in dieser App verfügbaren Audiodateien dürfen ausschließlich auf der Webseite von Mindboost genutzt werden. Jede Verwendung dieser Audiodateien außerhalb dieser Domain ist strengstens untersagt.</p>

        <h2>3. Nutzung des Algorithmus</h2>
        <p>Der in dieser App enthaltene Algorithmus darf nur von Nutzern mit einer aktiven und gültigen Lizenz verwendet werden. Die Lizenz muss während der gesamten Nutzungsdauer des Algorithmus gültig sein. Eine Nutzung ohne gültige Lizenz verstößt gegen unsere Nutzungsbedingungen.</p>

        <h2>4. Trial-Version</h2>
        <p>Jede natürliche oder juristische Person darf die Trial-Version dieser App nur einmal nutzen. Eine erneute Nutzung der Trial-Version ohne vorherige Absprache mit uns ist nicht erlaubt.</p>

        <h2>5. Account-Registrierung und Verantwortlichkeit</h2>
        <p>Die Nutzer sind verantwortlich für das sichere Aufbewahren ihrer Passwörter und für alle Aktivitäten, die unter ihrem Account stattfinden. Jeder Verdacht auf unbefugte Nutzung des Accounts sollte unverzüglich an unseren Kundenservice gemeldet werden.</p>

        <h2>6. Zahlungsbedingungen</h2>
        <p>Für bestimmte Teile unserer Dienste kann eine Gebühr anfallen. Alle Gebühren sind klar angegeben und sind zum Zeitpunkt der Fälligkeit zahlbar. Zahlungsverzögerungen können zur Deaktivierung des Zugangs führen.</p>

        <h2>7. Datenschutz</h2>
        <p>Ihre persönlichen Daten werden gemäß unserer Datenschutzrichtlinie behandelt, die Sie auf unserer Webseite einsehen können. Mit der Nutzung unserer Dienste stimmen Sie der Verarbeitung Ihrer Daten zu.</p>

        <h2>8. Änderungen der Dienste</h2>
        <p>Wir behalten uns das Recht vor, jederzeit Änderungen an unseren Diensten vorzunehmen oder Dienste einzustellen. Wir werden uns bemühen, die Nutzer rechtzeitig über solche Änderungen zu informieren.</p>

        <h2>9. Kündigung</h2>
        <p>Die Nutzer können ihr Abonnement jederzeit kündigen. Mindboost behält sich das Recht vor, den Service eines Nutzers zu kündigen oder zu suspendieren, wenn dieser gegen die Nutzungsbedingungen verstößt.</p>

        <h2>10. Haftungsbeschränkung</h2>
        <p>Mindboost haftet nicht für indirekte, zufällige, spezielle oder folgeschädigte Schäden, die aus der Nutzung oder Unfähigkeit zur Nutzung der Dienste entstehen.</p>

        <h2>11. Geltendes Recht und Gerichtsstand</h2>
        <p>Diese Nutzungsbedingungen unterliegen dem Recht des Landes, in dem Mindboost seinen Sitz hat, und alle Streitigkeiten werden ausschließlich vor den dortigen Gerichten verhandelt. </p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  setup () {
    const { t } = useI18n()
    const localePath = useLocalePath()
    return { t, localePath }
  }
}
</script>
