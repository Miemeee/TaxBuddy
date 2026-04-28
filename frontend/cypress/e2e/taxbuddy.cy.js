describe("TaxBuddy E2E Test", () => {

  it("register → login → onboarding → dashboard", () => {

    const email = `test${Date.now()}@gmail.com`;
    const password = "123456";

    // 1. REGISTER
    cy.visit("http://localhost:5173");

    cy.contains("สร้างบัญชีผู้ใช้เลย").click();

    cy.get('input[placeholder="ชื่อผู้ใช้"]').type("testuser");
    cy.get('input[placeholder="อีเมล"]').type(email);
    cy.get('input[placeholder="รหัสผ่าน"]').type(password);
    cy.get('input[placeholder="ยืนยันรหัสผ่าน"]').type(password);

    cy.get('input[type="checkbox"]').check({ force: true });

    cy.intercept("POST", "/api/auth/register").as("register");

    cy.contains("button", "สร้างบัญชีผู้ใช้").click();

    cy.wait("@register");

    cy.visit("http://localhost:5173/login");

    // 2. LOGIN
    cy.contains("เข้าสู่ระบบ").should("exist");

    cy.get('input[placeholder="อีเมล"]').type(email);
    cy.get('input[placeholder="รหัสผ่าน"]').type(password);
      // cy.get('input[placeholder="อีเมล"]').type("test@gmail.com");
      // cy.get('input[placeholder="รหัสผ่าน"]').type("123456");

    cy.contains("button", "เข้าสู่ระบบ").click();

    cy.url().should("include", "/onboarding");

    // 3. ONBOARDING 

    cy.contains("ตั้งค่าข้อมูลเบื้องต้น").should("exist");

    cy.contains("มีช่องทางรายได้อื่นหรือไม่").click({ force: true });
    cy.contains("มีช่องทางรายได้อื่นหรือไม่").click({ force: true });

    cy.get('input').should('have.length.at.least', 1);

    cy.get('input').eq(0).type("Donate");
    cy.get('input').eq(1).type("YouTube");
    cy.get('input').eq(2).type("TikTok");

    cy.contains("แต่งงาน").click();
    cy.get('input').should('have.length.at.least', 1);
    cy.get('input').eq(5).click({ force: true });

    cy.contains("ใช่").each(($el) => {
      cy.wrap($el).click({ force: true });
    });

    cy.contains("เพิ่มบุตร").click({ force: true });
    cy.contains("บุตรคนที่ 1").should("exist");

    cy.get('input').should('have.length.at.least', 1);
    cy.get('input').eq(9).type("5");

    cy.get('input').eq(13).click({ force: true });

    cy.contains("เพิ่มบิดามารดา").click({ force: true });
    cy.get('input').eq(14).type("65");

    cy.get('input').eq(18).click({ force: true });
    cy.get('input').eq(19).click({ force: true });

    cy.get('input').last().type("12345");

    cy.contains("button", "ดำเนินการต่อ")
      .should("be.enabled")
      .click();

    // 4. DASHBOARD
  cy.url().should("include", "/dashboard");

cy.contains("เลือกรายการที่ต้องการบันทึก")
  .parent()
  .contains("div", "รายได้")
  .click();

  // 5. INCOME
cy.url().should("include", "/income");
cy.get('input[placeholder="จำนวนเงิน"]').type("1000");
cy.contains("button", "บันทึก")
  .filter(':visible')
  .last()
  .click();
 cy.get('button')
  .find('svg')
  .closest('button')
  .first()
  .click();
  cy.url().should("include", "/dashboard");

  // 6. EXPENSE
  cy.contains("เลือกรายการที่ต้องการบันทึก")
    .parent()
    .contains("div", "ค่าใช้จ่าย")
    .click();
  cy.url().should("include", "/expense");
  cy.get('input[placeholder="จำนวนเงิน"]').type("500");
  cy.contains("button", "บันทึก")
  .filter(':visible')
  .last()
  .click();
 cy.get('button')
  .find('svg')
  .closest('button')
  .first()
  .click();
  cy.url().should("include", "/dashboard");

  // 7. SIMULATION
  cy.contains("จำลองการคำนวณภาษี").click();
  cy.url().should("include", "/simulation/income");
  cy.contains("ดำเนินการต่อ").click();
  cy.contains("กรุณาเลือกอย่างน้อย 1 รายการ").should("exist");
  cy.get('input[type="checkbox"]').first().check({ force: true });
  cy.contains('เลือกทั้งหมด').click();
  cy.contains("ดำเนินการต่อ").click();
  cy.url().should("include", "/simulation/deductions");
  cy.contains("คำนวณภาษี").click();
  cy.url().should("include", "/simulation/result");

  });

});