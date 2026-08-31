import { cn } from '@/shared/lib/utils';
import { ErrorMessage, Field, FieldAttributes, useFormikContext } from 'formik';
import { CircleAlert } from 'lucide-react';
import { ReactNode } from 'react';

interface InputFormProps extends FieldAttributes<any> {
  name: string;
  type: string;
  placeholder?: string;
  label?: string;
  inputType?: string;
  isRequired?: boolean;
  children?: ReactNode;
  invalid?: boolean;
  floatingLabel?: boolean;
  className?: string;
  disabled?: boolean;
}

export function InputForm({
  name,
  type,
  placeholder,
  label,
  inputType,
  isRequired = true,
  children,
  invalid = false,
  floatingLabel = false,
  disabled = false,
  ...rest
}: InputFormProps) {
  const { errors, touched } = useFormikContext<any>();
  const fieldError = !!(errors[name] && touched[name]);
  const hasError = fieldError || invalid;

  if (floatingLabel) {
    return (
      <label className="flex flex-col gap-1 w-full">
        <div
          className={cn(
            'relative flex items-center gap-2 border rounded-lg bg-white text-black-200 px-4 transition-all duration-300',
            'hover:border-blue-850 focus-within:border-blue-850 focus-within:shadow-focus-blue',
            '[&_svg]:w-6 [&_svg]:h-6',
            '[&>svg]:text-gray-700 focus-within:[&>svg]:text-blue-850',
            '[&_input]:flex-1 [&_input]:outline-none [&_input]:h-full [&_input]:w-full [&_input]:py-[0.875rem] [&_input]:text-[0.875rem] [&_input]:leading-[150%] [&_input]:border-0 [&_input]:rounded-lg [&_input]:bg-transparent',
            '[&_textarea]:flex-1 [&_textarea]:outline-none [&_textarea]:w-full [&_textarea]:py-[0.875rem] [&_textarea]:text-[0.875rem] [&_textarea]:leading-[150%] [&_textarea]:border-0 [&_textarea]:rounded-lg [&_textarea]:resize-none [&_textarea]:h-[168px] [&_textarea]:bg-transparent',
            label &&
              '[&_input::placeholder]:text-transparent [&_textarea::placeholder]:text-transparent',
            hasError
              ? 'border-red-400 [&>svg]:text-red-400 focus-within:[&>svg]:text-red-400'
              : 'border-gray-600',
            disabled &&
              'text-gray-600 border-gray-200 bg-gray-200 cursor-not-allowed hover:border-gray-200 focus-within:border-gray-200 focus-within:shadow-none'
          )}
        >
          {children}

          <Field
            as={type}
            name={name}
            type={inputType}
            disabled={disabled}
            placeholder={label ? placeholder ?? ' ' : placeholder}
            {...rest}
            aria-invalid={hasError || undefined}
            className={cn('peer', rest.className)}
          />

          {invalid && <CircleAlert className="shrink-0" aria-hidden />}

          {label && (
            <span
              className={cn(
                'pointer-events-none absolute top-1/2 -translate-y-1/2 bg-white px-1 text-[0.875rem] leading-[150%] text-gray-700 transition-all duration-200',
                children ? 'left-12' : 'left-4',
                'peer-focus:left-3 peer-focus:top-0 peer-focus:text-xs',
                'peer-[:not(:placeholder-shown)]:left-3 peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-xs',
                hasError && 'text-red-400',
                disabled && 'text-gray-600 bg-gray-200'
              )}
            >
              {label}
              {isRequired && ' *'}
            </span>
          )}
        </div>

        {fieldError && (
          <span className="text-red-400 font-bold text-xs">
            <ErrorMessage name={name} />
          </span>
        )}
      </label>
    );
  }

  return (
    <label className="flex flex-col gap-2 w-full">
      <span
        className={cn(
          'text-[0.875rem] leading-[150%] text-gray-700',
          disabled && 'text-gray-600'
        )}
      >
        {label}{' '}
        {isRequired && (
          <span className={cn('text-blue-700', disabled && 'text-gray-600')}>
            *
          </span>
        )}
      </span>
      <div
        className={cn(
          'flex items-center gap-2 border rounded-lg bg-white text-black-200 px-4 transition-all duration-300',
          'hover:border-blue-850 focus-within:border-blue-850 focus-within:shadow-focus-blue',
          '[&_svg]:w-6 [&_svg]:h-6 [&_svg]:text-gray-700',
          '[&_input]:flex-1 [&_input]:outline-none [&_input]:h-full [&_input]:w-full [&_input]:py-[0.875rem] [&_input]:text-[0.875rem] [&_input]:leading-[150%] [&_input]:border-0 [&_input]:rounded-lg',
          '[&_textarea]:flex-1 [&_textarea]:outline-none [&_textarea]:w-full [&_textarea]:py-[0.875rem] [&_textarea]:text-[0.875rem] [&_textarea]:leading-[150%] [&_textarea]:border-0 [&_textarea]:rounded-lg [&_textarea]:resize-none [&_textarea]:h-[168px]',
          '[&_input::placeholder]:text-gray-250 [&_textarea::placeholder]:text-gray-250',
          hasError ? 'border-red-400' : 'border-gray-600',
          disabled &&
            'text-gray-600 border-gray-200 bg-gray-200 cursor-not-allowed hover:border-gray-200 focus-within:border-gray-200 focus-within:shadow-none'
        )}
      >
        {children}
        <Field
          as={type}
          name={name}
          type={inputType}
          placeholder={placeholder}
          disabled={disabled}
          {...rest}
          aria-invalid={hasError || undefined}
        />
      </div>
      {fieldError && (
        <span className="text-red-400 font-bold text-xs">
          <ErrorMessage name={name} />
        </span>
      )}
    </label>
  );
}
