using System;
using System.Collections.Generic;

namespace MyMVCWebApp1.Models
{
    public partial class Contact
    {
        //autoproperties that reference columns in the DB (They were generated)
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
    }
}
