import { useTranslations } from "next-intl";

const Message = ( { message }: { message: string } ) => {
  const t = useTranslations( "Meeting" );

  return (
    <h1 className="text-xl" >{t( message )}</h1>
  );
};

export default Message;