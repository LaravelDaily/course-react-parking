import { useProfile } from '@/hooks/useProfile'
import ValidationError from '@/components/ValidationError'
import IconSpinner from '@/components/IconSpinner'

function EditProfile() {
  const [profile, updateProfile] = useProfile()

  async function handleSubmit(event) {
    event.preventDefault()
    await updateProfile(profile.data)
  }

  return (
    <form onSubmit={ handleSubmit }>
      <div className="flex flex-col mx-auto md:w-96 w-full">
        <h1 className="heading">Edit Profile</h1>

        { profile.status &&
          <div className="alert alert-success mb-4" role="alert">
            { profile.status }
          </div>
        }

        <div className="flex flex-col gap-2 mb-4">
          <label htmlFor="name" className="required">Name</label>
          <input
            id="name"
            name="name"
            type="text"
            value={ profile.data.name ?? '' }
            onChange={ event => profile.setData({ ...profile.data, name: event.target.value }) }
            className="form-input"
            autoComplete="name"
            disabled={ profile.loading }
          />
          <ValidationError errors={ profile.errors } field="name" />
        </div>

        <div className="flex flex-col gap-2 mb-4">
          <label htmlFor="email" className="required">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            value={ profile.data.email ?? '' }
            onChange={ event => profile.setData({ ...profile.data, email: event.target.value }) }
            className="form-input"
            autoComplete="email"
            disabled={ profile.loading }
          />
          <ValidationError errors={ profile.errors } field="email" />
        </div>

        <div className="border-t h-[1px] my-6"></div>

        <div className="flex flex-col gap-2 mb-4">
          <button type="submit" className="btn btn-primary" disabled={ profile.loading }>
            { profile.loading && <IconSpinner /> }
            Update Profile
          </button>
        </div>

      </div>
    </form>
  )
}

export default EditProfile
