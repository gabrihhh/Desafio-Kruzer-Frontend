export interface Deal {
    id: number;
    creator_user_id: User;
    user_id: User;
    person_id: Person;
    org_id: Organization;
    stage_id: number;
    title: string;
    value: number;
    currency: string;
    status: string;
    next_activity_date: string;
    next_activity_id: number;
    pipeline_id: number;
    close_time: string;
    won_time: string;
    expected_close_date: string;
    formatted_value: string;
    owner_name: string;
    cc_email: string;
    org_name: string;
    person_name: string;
    next_activity_subject: string;
    next_activity_type: string;
}

interface User {
    id: number;
    name: string;
    email: string;
    has_pic: number;
    pic_hash: string | null;
    active_flag: boolean;
    value: number;
}

interface Person {
    active_flag: boolean;
    name: string;
    email: Email[];
    phone: Phone[];
    owner_id: number;
    company_id: number;
    value: number;
}

interface Email {
    label: string;
    value: string;
    primary: boolean;
}

interface Phone {
    label: string;
    value: string;
    primary: boolean;
}

interface Organization {
    name: string;
    people_count: number;
    owner_id: number;
    address: string | null;
    label_ids: any[];
    active_flag: boolean;
    cc_email: string;
    owner_name: string;
    value: number;
}
