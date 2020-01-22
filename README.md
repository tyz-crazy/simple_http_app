# Analytics Service

API Requirements  
    ● Expose rest endpoint to ​collect​ ​ page-view events (HTTP calls from clients).  
        ○ Events can contain the following parameters (all not mandatory): timestamp, user-id, page-id

    ● Expose rest endpoint to ​get​ page-views by page-id ● Expose rest endpoint to ​get​ page-views by a browser name (can be extracted from the user agent) ● Expose rest endpoint to ​get​ the number page-views by country (should be extracted from the user IP) - the endpoint should get parameter and will          return all countries with the respective number of page-views 
    ● Expose rest endpoint to ​get​ page-views by country (should be extracted from the user IP) 
    ● Expose rest endpoint to ​get​ the ​rate​ between the number returning users (users who visited more than once ) out of all the unique users who visited. (should be a number between 0 and 1) 

All GET endpoints should be accessed only with "6i2nSgWu0DfYIE8I0ZBJOtxTmHJATRzu" token string in the Authorization header