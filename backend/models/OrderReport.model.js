module.exports = (orders) => {
    const today = new Date()
    console.log('data passed')
    console.log(orders)
    console.log("inside the pdf model")
    
    return `
        
        <!doctype html>
        <html lang="en">
    
        <head>
    
        <meta charset="utf-8">
        <titel></titel>
        <style>
        
        .clearfix:after {
            content: "";
            display: table;
            clear: both;
          }
          
          a {
            color: #5D6975;
            text-decoration: underline;
          }
          
          body {
            position: relative;
            width: 21cm;  
            height: 29.7cm; 
            margin: 0 auto; 
            color: #001028;
            background: #FFFFFF; 
            font-family: Arial, sans-serif; 
            font-size: 12px; 
            font-family: Arial;
          }
          
          header {
            padding: 10px 0;
            margin-bottom: 30px;
          }
          
          #logo {
            text-align: center;
            margin-bottom: 10px;
          }
          
          #logo img {
            width: 400px;
            object-fit: cover;
          }
          
          h1 {
            border-top: 1px solid  #5D6975;
            border-bottom: 1px solid  #5D6975;
            color: #5D6975;
            font-size: 2.4em;
            line-height: 1.4em;
            font-weight: normal;
            text-align: center;
            margin: 0 0 20px 0;
            background: url(dimension.png);
          }
          
          #project {
            float: left;
          }
          
          #project span {
            color: #5D6975;
            text-align: right;
            width: 52px;
            margin-right: 10px;
            display: inline-block;
            font-size: 0.8em;
          }
          
          #company {
            float: right;
            text-align: right;
          }
          
          #project div,
          #company div {
            white-space: nowrap;        
          }
          
          table {
            width: 100%;
            border-collapse: collapse;
            border-spacing: 0;
            margin-bottom: 20px;
          }
          
          table tr:nth-child(2n-1) td {
            background: #F5F5F5;
          }
          
          table th,
          table td {
            text-align: center;
          }
          
          table th {
            padding: 5px 20px;
            color: #5D6975;
            border-bottom: 1px solid #C1CED9;
            white-space: nowrap;        
            font-weight: normal;
          }
          
          table .service,
          table .desc {
            text-align: left;
          }
          
          table td {
            padding: 20px;
            text-align: right;
          }
          
          table td.service,
          table td.desc {
            vertical-align: top;
          }
          
          table td.unit,
          table td.qty,
          table td.total {
            font-size: 1.2em;
          }
          
          table td.grand {
            border-top: 1px solid #5D6975;;
          }
          
          #notices .notice {
            color: #5D6975;
            font-size: 1.2em;
          }
          
          footer {
            color: #5D6975;
            width: 100%;
            height: 30px;
            position: absolute;
            bottom: 0;
            border-top: 1px solid #C1CED9;
            padding: 8px 0;
            text-align: center;
          }
        
        </style>
    
        </head>
    
        <body>
    
        <header class="clearfix">
            <div id="logo">
                <img src="http://localhost:3001/fdd.png" height="100px">
            </div>
        <!-- <h1><b>Food Talks</b></h1> -->
        <h1>Orders Details</h1>
    
        <div id="company" class="clearfix">
          <div>Peris Marketing Services Pvt Ltd</div>
          <div>Colombo<br /> No 85004, Srilanka</div>
          <div>04122#####</div>
          <div><a href="#">pasindu.@gmail.com</a></div>
        </div>
        <div id="project">
          <div><span>Position</span>Delivery Manager</div>
          <div><span>Name</span>Pasindu Perakum</div>
         
          <div><span>EMAIL</span> <a href="#">pasindu.marketing@gmail.com</a></div>
          <div><span>DATE</span>${`${today}`}</div>
         
        </div>
      </header>
      <main>
        <table>
          <thead>
            <tr>
              <th>Customer Name</th>
              <th>Mobile Number</th>
              <th>City</th>
              <th>Deliver Location</th>
              <th>Deliver Date</th>
              <th>Delivery Person</th>
              <th>Total Amount</th>
              
            </tr>
          </thead>
          <tbody>
    
         ${orders.map((ord) => {
            return (
                `   <tr>
                <td class="service">${ord.customerName}</td>
                <td class="desc">${ord.mobileNumber}</td>
                <td class="desc">${ord.city}</td>
                <td class="desc">${ord.deliverLocation}</td>
                <td class="unit">${ord.deliverDate}</td>
                <td class="desc">${ord.deliveryPerson}</td>
                <td class="unit">${ord.totalAmount}</td>
                
                 
                </tr> `
            )
         })}  
          </tbody>
        </table>
        <div id="notices"> 
        </div>
      </main>
      <footer>
      </footer>
        </body>
        </html>
        `
  }