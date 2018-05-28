declare module 'oktell' {
  type MongoOptionField = { option_name: string, option_tag: string };
  type OktellField = any; // TODO: change from any

  interface IOktellFieldAttrs {
    handler: (value: OktellField, ...props) => any; // TODO: change from any
    attrs: Array<any>;
  }

  export default interface IOktell {
    vacancy: IOktellFieldAttrs;
    fio: IOktellFieldAttrs;
    bdate: IOktellFieldAttrs;
    telnum: IOktellFieldAttrs;
    city: IOktellFieldAttrs;
    dr_lic_country: IOktellFieldAttrs;
    dr_lic_number: IOktellFieldAttrs;
    dr_lic_date: IOktellFieldAttrs;
    dr_lic_end_date: IOktellFieldAttrs;
    yauber: IOktellFieldAttrs;
    date_interview: IOktellFieldAttrs;
    skype_call: IOktellFieldAttrs;
    personal_meeting: IOktellFieldAttrs;
    own_auto: IOktellFieldAttrs;
    mark: IOktellFieldAttrs;
    model: IOktellFieldAttrs;
    auto_number: IOktellFieldAttrs;
    auto_year: IOktellFieldAttrs;
    auto_color: IOktellFieldAttrs;
    park: IOktellFieldAttrs;
    date_visit: IOktellFieldAttrs;
    inline_purpose: IOktellFieldAttrs;
    driver_status: IOktellFieldAttrs;
    reject_reason: IOktellFieldAttrs;
    comment: IOktellFieldAttrs;
    recall: IOktellFieldAttrs;
    call_scheduled_dtm: IOktellFieldAttrs;
    time_recall: IOktellFieldAttrs;
    id_ticket: IOktellFieldAttrs;
  }
}
