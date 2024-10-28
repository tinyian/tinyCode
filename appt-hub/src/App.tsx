import './App.css'

interface MyButtonProps {
  /** The text to display site header */
  header: string;
  /** The text to display inside the button */
  btnTitle: string;
  /** Whether the button can be interacted with */
  disabled: boolean;
}

function MyHeader({header}: MyButtonProps) {
  return (
    <h1>{header}</h1>
  );
}

function MyButton({btnTitle, disabled }: MyButtonProps) {
  return (
    <button disabled={disabled}>{btnTitle}</button>
  );
}

export default function MyApp() {
  return (
    <div>
      <MyHeader header="Better Appointments"/>
      <MyButton btnTitle="I'm a disabled button" disabled={true}/>
      <MyButton btnTitle="I'm an enabled button" disabled={false}/>
    </div>
  );
}