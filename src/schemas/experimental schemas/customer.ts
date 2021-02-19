interface PuMember {
  membershipNo: number;
  membershipStatus: MembershipStatus;
}

//***Add Customer Phone Number To 'Order' Schema Instead Of Create New Schema For Takeout
//***Let Accounting Department Do MembershipStatus (We Just Show Raw Price)

/* 
	1- membership design by manager
	2- save the customer by phone numebr to manage their membership options
	3- logic for changing the memebrship status
*/

export enum MembershipStatus {
  Vip = "VIP",
  Normal = "NORMAL",
}
