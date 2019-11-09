$(document).ready(onReady);

function onReady(){
    $( '#add-employee-btn').on( 'click', addEmployee );
    $( '#employee-table' ).on( 'click', '.delete', removeEmployee );
    calculateMonthlySalary();
    $( '#monthly-out').on( 'click', changeColorRed );
}

let employees = [];

function addEmployee(event){
    //prevent page from refreshing on submit button
    event.preventDefault();
    //declare variables for inputs
    let fName = $( '#first-name-in' ).val();
    let lName = $( '#last-name-in' ).val();
    let idNumber = $( '#id-in' ).val();
    let jobTitle = $( '#job-title-in' ).val();
    let annualSalary = $( '#annual-salary-in' ).val();

    //push new employee object to the employees array
    employees.push(
        {
            fName: fName,
            lName: lName,
            idNumber: idNumber,
            jobTitle: jobTitle,
            annualSalary: annualSalary
        }
    )
    //clear out the inputs
    $( '#first-name-in' ).val('');
    $( '#last-name-in' ).val('');
    $( '#id-in' ).val('');
    $( '#job-title-in' ).val('');
    $( '#annual-salary-in' ).val('');
    // call function to show employees in the table
    // call function to calculate the monthly salary
    showEmployees( employees );
    calculateMonthlySalary();
}

function showEmployees( array ){
    //empty the table
    $( '#employee-table' ).empty();
    //loop for each employee in the array and 
    //add a new <tr> and <td> for each category
    for ( let employee of array ){
        $( '#employee-table' ).append(
            `<tr>
                <td>${employee.fName}</td>
                <td>${employee.lName}</td>
                <td>${employee.idNumber}</td>
                <td>${employee.jobTitle}</td>
                <td>$${employee.annualSalary}</td>
                <td><button class="delete">Delete</button></td>
            </tr>`);
    }
}

function removeEmployee(){
    //declare button variable to this
    let button = $( this );
    //removes tr element
    button.closest( 'tr' ).remove();
}

function calculateMonthlySalary(){
    let totalSalary = 0;
    //loop through employees array and add total of all annual salaries
    for ( let i=0; i < employees.length; i++){
        totalSalary += Number( employees[i].annualSalary );
    }// end loop
    // divide totalSalary by 12 to get monthly salary
    let monthlySalary = totalSalary / 12;
     //make monthly salary be fixed to two decimals
    let monthlySalaryFixed = monthlySalary.toFixed( 2 );
    //display monthly budget
    let monthlyBudget = $( '#monthly-out' );
    monthlyBudget.empty();
    monthlyBudget.append( monthlySalaryFixed );
    //changes color red if monthly salary totals are over 20000
    if ( monthlySalary >= 20000){
        $( '#monthly-out' ).addClass( 'p-3 mb-2 bg-danger text-white' );
        $( '#monthly-header' ).addClass( 'p-3 mb-2 bg-danger text-white' );
    }
}

