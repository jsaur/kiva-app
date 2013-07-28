//start off just grabbing newest loans and logging them
$(document).ready(function(){
	var loanInfo = [];

	$.get("http://api.kivaws.org/v1/loans/newest.json", function(data){
		console.log(data.loans);

		$.each(data.loans, function(i, loan) {
          loanInfo.push([
          	loan.name,
          	loan.activity,
          	loan.sector,
          	locationToString(loan.location),
          	loan.status,
          	loan.loan_amount,
          	loan.funded_amount,
          	loan.basket_amount,
          	loan.borrower_count,
          	descriptionToString(loan.description),
          	loan.partner_id,
          	loan.planned_expiration_date,
          	loan.posted_date,
          	loan.use]);
      	});

      	$('#loans-table').dataTable({
	        "aaData": loanInfo,
	        "aoColumns": [
	          { "sTitle": "Name"},
	          { "sTitle": "Activity"},
	          { "sTitle": "Sector"},
	          { "sTitle": "Location"},
	          { "sTitle": "Status"},
	          { "sTitle": "Loan Amount"},
	          { "sTitle": "Funded Amount"},
	          { "sTitle": "Basket Amount"},
	          { "sTitle": "Borrower Count"},
	          { "sTitle": "Description"},
	          { "sTitle": "Partner Id"},
	          { "sTitle": "Expiration Date"},
	          { "sTitle": "Posted Date"},
	          { "sTitle": "Use"},
		    ],
		    "bJQueryUI": true,
		    "sPaginationType": "full_numbers",
	     }, "json");
	});
});

function locationToString(location) {
	try {
		return location.town + ", " + location.country;
	}
	catch(error) {
		return "";
	}
}

function descriptionToString(description) {
	try {
		return description.languages.join(", ");
	}
	catch(error) {
		return "";
	}
}