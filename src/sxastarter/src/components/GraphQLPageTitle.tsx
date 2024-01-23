/* eslint-disable */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { Field, GetStaticComponentProps, RichText as JssRichText } from '@sitecore-jss/sitecore-jss-nextjs';
import { revalidationGraphQLClient } from 'lib/graphql';


interface Fields {
  Text: Field<string>;
}

export type RichTextProps = {
  params: { [key: string]: string };
  fields: Fields;
};

export const Default = (props: RichTextProps): JSX.Element => {
  const text = props.fields ? (
    <JssRichText field={props.fields.Text} />
  ) : (
    <span className="is-empty-hint">Rich text</span>
  );
  const id = props.params.RenderingIdentifier;

  return (
    <div
      className={`component rich-text ${props.params.styles.trimEnd()}`}
      id={id ? id : undefined}
    >
      <div className="component-content">{text}</div>
    </div>
  );
};

export const getStaticProps: GetStaticComponentProps = async (rendering: any, layoutData: any, context: any) => {

  const query = `
    # Write your query or mutation here
    query {
      item(path:"/sitecore/content/revalidationsite/revalidationsite/Home", language:"en") {
        field(name:"Title") {
        ...EditableField
        }
        
      }
    }

    fragment EditableField on ItemField {
      id: id
      value: value
      name: name
      jsonValue: jsonValue
    }
      `;
  
  let result = await revalidationGraphQLClient.request(query);
  console.log("GRAPHQL QUERY IN GET STATIC PROPS: " + JSON.stringify(result) + " --- context: " + context);

  return {
    rendering: rendering,
    layoutData: layoutData,
    context: layoutData?.sitecore?.route,
  };
};
