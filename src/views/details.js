import {
  applyForOffer,
  deleteOffer,
  getApplicationsByOfferId,
  getMyApplicationsByOfferId,
  getOfferById,
} from "../api/data.js";
import { html } from "../lib.js";
import { getUserData } from "../util.js";

const detailsTemplate = (
  offer,
  isOwner,
  onDelete,
  applications,
  showAppBtn,
  onApply
) => html`
  <section id="details">
    <div id="details-wrapper">
      <img id="details-img" src=${offer.imageUrl} alt="example1" />
      <p id="details-title">${offer.title}</p>
      <p id="details-category">
        Category: <span id="categories">${offer.category}</span>
      </p>
      <p id="details-salary">
        Salary: <span id="salary-number">${offer.salary}</span>
      </p>
      <div id="info-wrapper">
        <div id="details-description">
          <h4>Description</h4>
          <span>${offer.description}</span>
        </div>
        <div id="details-requirements">
          <h4>Requirements</h4>
          <span>${offer.requirements}</span>
        </div>
      </div>
      <p>Applications: <strong id="applications">${applications}</strong></p>
      <div id="action-buttons">
        ${isOwner
          ? html`<a href="/edit/${offer._id}" id="edit-btn">Edit</a>
              <a href="#" @click=${onDelete} id="delete-btn">Delete</a>`
          : ""}
        <!--Edit and Delete are only for creator-->
        ${showAppBtn
          ? html` <a href="javascript:void(0)" @click=${onApply} id="apply-btn"
              >Apply</a
            >`
          : ""}

        <!--Bonus - Only for logged-in users ( not authors )-->
      </div>
    </div>
  </section>
`;

export async function detailsView(ctx) {
  const userData = getUserData();

  const [offer, applications, hasApplied] = await Promise.all([
    getOfferById(ctx.params.id),
    getApplicationsByOfferId(ctx.params.id),
    userData ? getMyApplicationsByOfferId(ctx.params.id, userData.id) : 0,
  ]);

  const isOwner = userData?.id == offer._ownerId;

  const showAppBtn =
    userData != null && isOwner == false && hasApplied == false;
  ctx.render(
    detailsTemplate(offer, isOwner, onDelete, applications, showAppBtn, onApply)
  );

  async function onDelete() {
    const choice = confirm("Are you sure you want to delete this offer?");

    if (choice) {
      ctx.page.redirect("/dashboard");
      await deleteOffer(ctx.params.id);
      
    }
    //  ctx.page.redirect("/details/"+ctx.params.id);
  }
  async function onApply() {
    await applyForOffer(ctx.params.id);
    ctx.page.redirect("/details/" + ctx.params.id);
  }
}
